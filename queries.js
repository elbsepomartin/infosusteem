const bcrypt = require('bcrypt');

// Dotenv config
require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.QUERY_PORT,
});

const getContacts = (request, response) => {
    pool.query('SELECT * FROM contacts', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows);
    });
}

const createContact = (request, response) => {
    const { name, secret_code, phone_number } = request.body;

    pool.query('INSERT INTO contacts (name, secret_code, phone_number) VALUES ($1, $2, $3)', [name, secret_code, phone_number], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('Contact added.');
    })
}

const createUser = async (request, response) => {
    const { email, password } = request.body;
    let hashedPassword = await bcrypt.hash(password, 10);

    pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send('User registered.');
    })
}

module.exports = { getContacts, createContact, createUser }