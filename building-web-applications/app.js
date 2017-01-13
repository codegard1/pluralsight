var express = require('express');
//var handlebars = require('express-handlebars');
var app = express();
var port = process.env.PORT || 5000;
var bookRouter = express.Router();

app.use(express.static('public'));
app.set('views', 'src/views');
/* Jade config */
app.set('view engine', 'jade');

/* handlebars config */
//app.engine('.hbs', handlebars({extname: '.hbs'}));
//app.set('view engine', '.hbs');

var books = [
    {
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
app.use('/Books', bookRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'My Cool App',
        nav: [{
            Link: '/Books',
            Text: 'Books'
        },{
            Link: '/Authors',
            Text: 'Authors'
        }]
    });
});

app.listen(port, function (err) {
    console.log(err || ('running server on port ' + port));
});