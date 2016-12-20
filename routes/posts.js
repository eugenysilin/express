var express = require('express');
var router = express.Router();

/* GET posts listing. */
router.get('/', function(req, res, next) {
    res.render('posts', {siteTitle:'Express', title: 'Posts', description: 'respond with a resource Posts!!!'});
});

module.exports = router;