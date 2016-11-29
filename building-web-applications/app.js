var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

app.use(express.static('public'));
app.set('views', 'src/views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
    res.render('index', {
        list: ['1', '2', '3', '4', '5']
    });
});

app.get('/books', function (req, res) {
    res.send('Hello books');
});

app.listen(port, function (err) {
    console.log(err || ('running server on port ' + port));
});