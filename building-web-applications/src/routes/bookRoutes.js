var express = require('express');
var bookRouter = express.Router();
//var sql = require('mssql');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var router = function (nav) {
    bookRouter.route('/')
        .get(function (req, res) {

            // MongoDB config
            //var url = 'mongodb://el-oso:27017/LibraryApp';
            var url = 'mongodb://mg000xscrs00:27017/LibraryApp';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.find().toArray(
                    function(err, results) {
                        res.render('bookListView', {
                            title: 'Books',
                            nav: nav,
                            books: results
                        });
                        db.close();
                    }
                );
            });
            
            // SQL Config
            /*var request = new sql.Request();
            console.log('request.query()');
            request.query('select * from books',
                function (err, recordset) {
                    console.log(err || recordset);
                    res.render('bookListView', {
                        title: 'Books',
                        nav: nav,
                        books: recordset
                    });
                }
            );*/
            
        }); // end .get

    bookRouter.route('/:id')
        .all(function (req, res, next) {

            // MongoDB config
            var id = new objectId(req.params.id);
            //var url = 'mongodb://el-oso:27017/LibraryApp';
            var url = 'mongodb://mg000xscrs00:27017/LibraryApp';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.findOne({_id: id},
                    function(err, result) {
                        if (result.length === 0) {
                            res.status(404).send('Not Found');
                        } else {
                            console.log(result);
                            req.book = result;
                            next();
                        }
                        db.close();
                    }
                );
            });

            // SQL Config
            /*var ps = new sql.PreparedStatement();
            ps.input('id', sql.Int);
            ps.prepare('select * from books where id = @id',
                function (err) {
                    ps.execute({ id: req.params.id },
                        function (err, recordset) {
                            if (recordset.length === 0) {
                                res.status(404).send('Not found');
                            } else {
                                console.log(err || recordset);
                                req.book = recordset[0];
                                next();
                            }
                        });
                }
            ); // end ps.prepare()*/

        })
    .get(function (req, res) {
        res.render('bookView', {
            title: 'Book',
            nav: nav,
            book: req.book
        });
    });
    return bookRouter;
};
module.exports = router;