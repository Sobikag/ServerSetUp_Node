const jwt = require('jsonwebtoken');

const User = require('../models/User');
const userSerializer = require('../serializers/users');
// console.log("........",userSerializer);

module.exports = {
    create: async (req, res, next) => {
        const user = await User.create(req.body);
        // console.log("user controller", user);
        if (user.errors) {
          res.json({ user: user });
        } else {
          const serializedUser = await userSerializer(user);
          const token = jwt.sign({ user: serializedUser }, process.env.JWT_SECRET);
        //   console.log("token", token);
        //   console.log("serialized user", serializedUser);
          res.json({ jwt: token, user: serializedUser });
        }
      },

      index: async (req, res, next) => {
        const users = await User.all();
        const serializedUsers = users.map(user => userSerializer(user));
        res.json({ users: serializedUsers });
      },

};