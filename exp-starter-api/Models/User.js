const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const query = require('../db/index').query;

const userSerializer = require('../serializers/users');

module.exports = {
    all: async() =>{
        const user = (await query('SELECT * FROM "users"')).rows;
        return user;
    },
    create: async properties =>{
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const passwordDigest = bcrypt.hashSync(properties.password, salt);
        const createdUser = (await query(`INSERT INTO "users"(
            "firstName",
            "lastName",
            "email",
            "student",
            "passwordDigest"
        )values($1, $2, $3, $4, $5) returning *`,
        [
            properties.firstName,
            properties.lastName,
            properties.email,
            properties.student,
            passwordDigest
        ]
    )).rows[0];
    // console.log("from create function");
    // console.log("created user", createdUser);
    return createdUser;
    },

    authenticate: async credentials =>{
        const user = (await query('SELECT * FROM "users" WHERE "email" = ($1)', [
            credentials.email,
        ])).rows[0];


        const valid = user? await bcrypt.compare(credentials.password, user.passwordDigest): false;
        if(valid){
            const serializedUser = await userSerializer(user);
            const token = jwt.sign({ user: serializedUser }, process.env.JWT_SECRET);
            return { jwt: token, user: serializedUser };
        }else{
            return {errors: ['Email or Password is Incorrect']};
        }
    }







}



//...........................................................................................
// module.exports = {
//     all: async() =>{
//         const Users = (await query('SELECT * FROM "users"')).rows;
//         return Users;
//     },
//     create: async Users =>{
//         const saltRounds = 10;
//         const salt = bcrypt.genSaltSync(saltRounds);
//         const passwordDigest = bcrypt.hashSync(properties.password, salt);
//         const{
//             firstName,
//             lastName,
//             email,
//             student,
//             // passwordDigest
//         } = Users;
//         const createdUser = (await query(`INSERT INTO "users"(
//             "firstName",
//             "lastName",
//             "email",
//             "student",
//             "passwordDigest"
//         )values($1, $2, $3, $4, $5) returning *`,
//         [
//             properties.firstName,
//             properties.lastName,
//             properties.email,
//             properties.student,
//             passwordDigest
//         ]
//     )).rows[0];

//     return createdUser;
//     }
// }