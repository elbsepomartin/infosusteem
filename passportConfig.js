const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.QUERY_PORT,
});

function initialize(passport) {
    const authenticateUser = (email, password, done) => {
        pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
            if (error) {
                throw error
            }

            if (results.rows.length > 0) {
                const user = results.rows[0];

                bcrypt.compare(password, user.password, (error, isMatch) => {
                    if (error) {
                        throw error
                    }

                    if (isMatch) {
                        return done(null, user)
                    } else {
                        return done(null, false, { message: 'Vale parool' })
                    }
                })
            } else {
                return done(null, false, { message: 'E-maili ei eksisteeri '})
            }
        })
    }

    passport.use(
        new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
            authenticateUser
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    passport.deserializeUser((id, done) => {
        pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
            if (error) {
                throw error
            }

            return done(null, results.rows[0]);
        })
    })
}

module.exports = initialize;