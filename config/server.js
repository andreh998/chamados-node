var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var consign = require('consign');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var helmet = require('helmet');
var morgan = require('morgan');

require('dotenv').load();

var app = express();

app.use(morgan('dev')); //mostra no console todas as requests
app.use(helmet());
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(expressSession({
    secret: 'ishd892hd8ha8shd82hd2asd2h8d',
    resave: false,
    saveUninitialized: false
    //cookie: { maxAge: 60000 }
}));

consign()
    .include('app/controllers')
    .then('app/routes')
    .then('app/models')
    .then('config/dbConnection.js')
    .into(app);

module.exports = app;