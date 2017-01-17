var express = require('express');
var authorRouter = express.Router();
var sql = require('mssql');

var router = function (nav) {
    authorRouter.route('/')
        .get(function (req, res) {
            var request = new sql.Request();
            request.query('select id,Author from books', 
                function(err, recordset) {
                    console.log(err || recordset);
                    res.render('authorListView', {
                        title: 'Authors',
                        nav: nav,
                        authors: recordset
                    });
                }
            ); // end query
            
        });
    authorRouter.route('/:id')
        .get(function (req, res) {
            var id = req.params.id;
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
            ); // end query
            
        });
    return authorRouter;
};
module.exports = router;