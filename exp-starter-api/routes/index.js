var express = require('express');
var router = express.Router();
const usersController = require('../controllers/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send("oh hai");
  res.status(200);
});
router.get('/', usersController.index);

module.exports = router;
