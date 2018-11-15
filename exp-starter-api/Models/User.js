const bcrypt = require('bcryptjs');
const query = require('../db/index').query;

module.exports = {
    all: async() =>{
        const users = (await query('SELECT * FROM "users"')).rows;
        return users;
    },
}

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const passwordDigest = bcrypt.hashSync(properties.password, salt);

const createdUser = (await query(
    `INSERT INTO "users"(
        "firstName",
        "lastName",
        "email",
        "student",
        "password",
    )`))