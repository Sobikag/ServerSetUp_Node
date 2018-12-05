var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
//   res.json({users: []});
//   res.status(200);
// });
const userController = require('../controllers/users');

router.post('/', userController.create);

module.exports = router;
