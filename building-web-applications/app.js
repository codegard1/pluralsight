var express = require('express');
var handlebars = require('express-handlebars');
var app = express();
var port = process.env.PORT || 5000;

app.use(express.static('public'));
app.set('views', 'src/views');
/* Jade config */
//app.set('view engine', 'jade');

/* handlebars config */
app.engine('.hbs', handlebars({extname: '.hbs'}));
app.set('view engine', '.hbs');

app.get('/', function (req, res) {
    res.render('index', {
        list: ['1', '2', '3', '4', '5'],
        title: 'My Cool App'
    });
});

app.get('/books', function (req, res) {
    res.send('Hello books');
});

app.listen(port, function (err) {
    console.log(err || ('running server on port ' + port));
});