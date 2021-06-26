const express = require('express');
const path = require('path');
const flash = require('connect-flash');
const passport = require('passport');
const request = require('request');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const index = require('./routes/index');
const app = express();

const initializePassport = require('./passportConfig');
initializePassport(passport);

// Dotenv config
require('dotenv').config();

app.listen(process.env.PORT, function () {
    console.log('Server is running on port ' + process.env.PORT);
});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// JSON parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'secretkeyn321j3n1'
}));
app.use(passport.initialize());
app.use(passport.session());

// Public path
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', index);

module.exports = app;