var express = require('express');
var bookRouter = express.Router();
var sql = require('mssql');

var router = function (nav) {
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
    var books1 = {};
    bookRouter.route('/')
        .get(function (req, res) {
            var request = new sql.Request();
            console.log('request.query()');
            request.query('select * from books',
                function(err, recordset) {
                    console.log(recordset);
                    books1 = recordset;
                }
            );
            res.render('bookListView', {
                title: 'Books',
                nav: nav,
                books: books1
            });
        });
    bookRouter.route('/:id')
        .get(function (req, res) {
            var id = req.params.id;
            res.render('bookView', {
                title: 'Book',
                nav: nav,
                book: books[id]
            });
        });
    return bookRouter;
};
module.exports = router;