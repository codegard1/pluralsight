var express = require('express');
var bookRouter = express.Router();
var sql = require('mssql');

var router = function (nav) {
    bookRouter.route('/')
        .get(function (req, res) {
            var request = new sql.Request();
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
            );
            
        });
    bookRouter.route('/:id')
        .all(function (req, res, next) {
            var ps = new sql.PreparedStatement();
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
                }); // end ps.prepare()
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