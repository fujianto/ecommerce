var express = require('express');
var router = express.Router();
const customerController = require('../controllers/customerController');
const middleware = require('../helpers/middleware');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', customerController.create);
router.post('/signin', middleware.signIn, customerController.signIn)

module.exports = router;
