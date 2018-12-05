var express = require('express');
var router = express.Router();

const loginController = require('../controllers/login');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send(loginController.create);
//   res.json({users: []});
//   res.status(200);
// });

router.post('/', loginController.create);

module.exports = router;