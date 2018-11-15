const query = require('../db/index').query;

module.exports = async() =>{
    await query('DELETE FROM "users"');
};