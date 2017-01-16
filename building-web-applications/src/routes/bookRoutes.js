var express = require('express');
var bookRouter = express.Router();

var books = [{
        title: 'War and Peace',
        author: 'Lev Nikolayevich Tolstoy',
    },
    {
        title: 'Animal Farm',
        author: 'George Orwell'
    },
    {
        title: 'House of Leaves',
        author: 'Mark Z. Danielewski'
    },
    {
        title: 'A Dog\'s Purpose',
        author: 'W. Bruce Cameron'
    },
    {
        title: 'The Whistler',
        author: 'John Grisham'
    },
    {
        title: 'Two by Two',
        author: 'Nicholas Sparks'
    },
    {
        title: 'The Mistress',
        author: 'Danielle Steel'
    },
    {
        title: 'The Underground Railroad',
        author: 'Colson Whitehead'
    },
    {
        title: 'Below the Belt',
        author: 'Stuart Woods'
    },
];

bookRouter.route('/')
    .get(function (req, res) {
        res.render('books', {
            title: 'Books',
            nav: [{
                Link: '/Books',
                Text: 'Books'
            }, {
                Link: '/Authors',
                Text: 'Authors'
            }],
            books: books
        });
    });

bookRouter.route('/single')
    .get(function (req, res) {
        res.send('Hello single book');
    });

module.exports = bookRouter;