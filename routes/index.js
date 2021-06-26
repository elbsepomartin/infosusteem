var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const fetch = require('node-fetch');
const session = require('express-session');
const passport = require('passport');

// Database
const db = require('../queries');

// Body parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', checkAuthenticated, (req, res) => {
   res.render('index');
});

router.post('/login', passport.authenticate('local', {
   successRedirect: '/contacts',
   failureRedirect: '/login'
}));

router.get('/logout', (req, res) => {
   req.logout();
   res.redirect('/');
})

router.get('/register', checkAuthenticated, (req, res) => {
   res.render('register');
});

router.get('/contacts', checkNotAuthenticated, async (req, res) => {
   const obj = await fetchData();
   res.render('contacts', { obj });
});

router.get('/add', checkNotAuthenticated, (req, res) => {
   res.render('addContact');
});

// API reqests
// - GET contact data for list
function fetchData(){
   return fetch("http://localhost:3000/api/contacts")
       .then(res => res.json())
}

router.get('/api/contacts', db.getContacts);
router.post('/api/addContact', db.createContact);
router.post('/register', db.createUser);

function checkAuthenticated(req, res, next) {
   if (req.isAuthenticated()) {
      return res.redirect('/contacts')
   }

   next();
}

function checkNotAuthenticated(req, res, next) {
   if (req.isAuthenticated()) {
      return next();
   }

   res.redirect('/');
}

module.exports = router;