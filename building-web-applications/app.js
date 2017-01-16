var express = require('express');
var bookRouter = require('./src/routes/bookRoutes');
//var handlebars = require('express-handlebars');
var app = express();
var port = process.env.PORT || 5000;


app.use(express.static('public'));
app.set('views', 'src/views');
app.set('view engine', 'jade'); // jade config

/* handlebars config */
//app.engine('.hbs', handlebars({extname: '.hbs'}));
//app.set('view engine', '.hbs');

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