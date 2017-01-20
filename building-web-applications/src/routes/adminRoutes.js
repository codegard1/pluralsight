var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [];

var router = function (nav) {
    adminRouter.route('/addBooks')
        .get(function (req, res) {
            //var url = 'mongodb://el-oso:27017/LibraryApp';
            var url = 'mongodb://mg000xscrs00:27017/LibraryApp';
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