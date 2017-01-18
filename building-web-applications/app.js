var express = require('express');
//var handlebars = require('express-handlebars');
var app = express();
var port = process.env.PORT || 5000;
//var sql = require('mssql');
/*var config = {
    user: 'node',
    password: 'pluralsight',
    server: 'D4358059',
    database: 'LibraryApp',
    requestTimeout: 5000,
    options: {
        instanceName: 'SQLEXPRESS'
    }
};
sql.connect(config, function(err) {
    console.log(err || 'sql.connect() successful');
});*/

app.use(express.static('public'));
app.set('views', 'src/views');
app.set('view engine', 'jade'); // jade config

/* handlebars config */
//app.engine('.hbs', handlebars({extname: '.hbs'}));
//app.set('view engine', '.hbs');

var nav = [{
    Link: '/Books',
    Text: 'Books'
}, {
    Link: '/Authors',
    Text: 'Authors'
}];

var bookRouter = require('./src/routes/bookRoutes')(nav);
app.use('/Books', bookRouter);
var authorRouter = require('./src/routes/authorRoutes')(nav);
app.use('/Authors', authorRouter);
var adminRouter = require('./src/routes/adminRoutes')(nav);
app.use('/Admin', adminRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'My Cool App',
        nav: nav
    });
});

app.listen(port, function (err) {
    console.log(err || ('running server on port ' + port));
});