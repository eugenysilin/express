var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', {siteTitle: 'Express', title: 'Users', description: 'respond with a resource Users!!!'});
});

module.exports = router;
