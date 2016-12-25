var express = require('express');
var router = express.Router();

var mysql      = require('mysql');
// var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Start MySQL

var mysqlResult = {};

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123321',
    database: 'boots-sigmalion'
});

connection.connect();

connection.query('' +
    'SELECT option_value as value ' +
    'FROM wp_options ' +
    'WHERE option_name = "siteurl" ' +
    'OR option_name = "blogname"',
    (err, rows, fields) => {
        if (err) throw err;

        mysqlResult = rows;

        // console.log(mysqlResult);

    });

connection.end();

// End MySQL

// =======

// Start Mongo

// === Insert ===

var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('site_options');
    // Insert some documents
    collection.insertMany([
        {site_name: mysqlResult[0].value}, {site_url: mysqlResult[1].value}
    ], function(err, result) {
        callback(result);
    });
};

// === Delete ===

var deleteDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('site_options');
    // Delete some documents
    collection.remove();
};

setTimeout(() => {

// Connection URL
    var url = 'mongodb://localhost:27017/sigmalion';

// Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        // insertDocuments(db, function () {
        //     db.close();
        // });

        // deleteDocuments(db, function() {
        //     db.close();
        // });

    });

}, 1000);

// End Mongo

router.get('/', (req, res) => {
    res.render('mysql-to-mongo', {data:{site_name: mysqlResult[0].value, site_url: mysqlResult[1].value}});
});

module.exports = router;