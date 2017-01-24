var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var url = require('../config/db');

var books = [];

var router = function () {
    adminRouter.route('/addBooks')
        .get(function (req, res) {
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.insertMany(books,
                    function (err, results) {
                        res.send(results);
                        db.close();
                    }
                );
            });
        });
    return adminRouter;
};

module.exports = router;