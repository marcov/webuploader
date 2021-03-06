var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var serveIndex = require('serve-index');

var index = require('./routes/index');
var users = require('./routes/users');
var fs      = require('fs');
var config  = require('./config.js');


if (!fs.existsSync(config.uploadRoot)) {
  console.log("The upload folder '"+config.uploadRoot+"' does not exist (hint: you need to create it!).");
  //  fs.mkdirSync(config.uploadRoot);
  process.exit(-1);
}

console.log("Starting up...");
console.log("Using '"+config.uploadRoot+"' as upload folder");

var app = express();


console.log("Starting up...");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/uploads', express.static(config.uploadRoot),
        serveIndex(config.uploadRoot,
        {'icons': true, view: 'details'}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page

  res.status(err.status || 500);
  res.render('error', {path : req.url});
});

module.exports = app;

