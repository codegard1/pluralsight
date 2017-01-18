var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
    {
        id: 0,
        title: 'War and Peace',
        author: 'Lev Nikolayevich Tolstoy',
    },
    {
        id: 1,
        title: 'Animal Farm',
        author: 'George Orwell'
    },
    {
        id: 2,
        title: 'House of Leaves',
        author: 'Mark Z. Danielewski'
    },
    {
        id: 3,
        title: 'A Dog\'s Purpose',
        author: 'W. Bruce Cameron'
    },
    {
        id: 4,
        title: 'The Whistler',
        author: 'John Grisham'
    },
    {
        id: 5,
        title: 'Two by Two',
        author: 'Nicholas Sparks'
    },
    {
        id: 6,
        title: 'The Mistress',
        author: 'Danielle Steel'
    },
    {
        id: 7,
        title: 'The Underground Railroad',
        author: 'Colson Whitehead'
    },
    {
        id: 8,
        title: 'Below the Belt',
        author: 'Stuart Woods'
    }
];

var router = function (nav) {
    adminRouter.route('/addBooks')
        .get(function(req, res) {
            var url = 'mongodb://el-oso:27017/LibraryApp';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.insertMany(books, 
                    function (err, results) {
                        res.send(err || results);
                        db.close();
                    }
                );
            });
            res.send('inserting books');
        });
    return adminRouter;
};

module.exports = router;