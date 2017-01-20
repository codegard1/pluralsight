var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
//var handlebars = require('express-handlebars');

var app = express();
var port = process.env.PORT || 5000;

// MSSQL Connection
/* var sql = require('mssql');
var config = {
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

// MIDDLEWARE
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'library'
}));
require('./src/config/passport')(app);

app.set('views', 'src/views');
app.set('view engine', 'jade');

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
var authRouter = require('./src/routes/authRoutes')();
app.use('/auth', authRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'My Cool App',
        nav: nav
    });
});

app.listen(port, function (err) {
    console.log(err || ('running server on port ' + port));
});