const query = require('../db/index').query;

module.exports = {
    all: async() =>{
        const users = (await query('SELECT * FROM "users"')).rows;
        return users;
    },
}