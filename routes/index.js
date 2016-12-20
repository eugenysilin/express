"use strict";

var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function (req, res) {
    res.render(
        'index',
        {
            title: 'Express',
            description: 'My Description...'
        }
        );
});

/* POST home page. */

var getPostQueries = function (req, res, next) {
    console.log(req.body);
    next();
};

router.post('/', getPostQueries);

router.post(
    '/', function (req, res) {
        let queries = req.body;
        res.render(
            'index',
            {
                title: 'Express',
                description: 'POST request to the homepage',
                first_name: queries.first_name,
                last_name: queries.last_name
            }
            );
    });

module.exports = router;
