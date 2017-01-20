var express = require('express');
var authorRouter = express.Router();
//var sql = require('mssql');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var router = function (nav) {
    authorRouter.route('/')
        .get(function (req, res) {

            // MongoDB config
            //var url = 'mongodb://el-oso:27017/LibraryApp';
            var url = 'mongodb://mg000xscrs00:27017/LibraryApp';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.find().toArray(
                    function(err, results) {
                        res.render('authorListView', {
                            title: 'Authors',
                            nav: nav,
                            authors: results
                        });
                        db.close();
                    }
                );
            });

            // SQL config
            /* var request = new sql.Request();
            request.query('select id,Author from books', 
                function(err, recordset) {
                    console.log(err || recordset);
                    res.render('authorListView', {
                        title: 'Authors',
                        nav: nav,
                        authors: recordset
                    });
                }
            ); // end query */
            
        });
    authorRouter.route('/:id')
        .get(function (req, res) {

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
                            res.render('authorView', {
                                title: 'Author',
                                nav: nav,
                                author: result
                                });
                        }
                        db.close();
                    }
                );
            });
            // SQL Config
           /*var id = req.params.id;
            var request = new sql.Request();
            request.query('select id,Author from books where id = ' + id, 
                function(err, recordset) {
                    console.log(err || recordset);
                    res.render('authorView', {
                        title: 'Author',
                        nav: nav,
                        author: recordset[0]
                    });
                }
            ); // end query */
            
        });
    return authorRouter;
};
module.exports = router;