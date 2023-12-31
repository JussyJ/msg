var createError = require('http-errors');
const https = require('https');
const fs = require('fs');
const express = require('express');
require('dotenv').config();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var indexRouter = require('./routes/index');
var translateRouter = require('./routes/translate');
var path = require('path');

const app = express();
app.disable('x-powered-by');

require('dotenv').config({
  path: `${__dirname}/.env`
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// const httpsServer = https.createServer(credentials, app);

app.use('/message', indexRouter);
app.use('/translate', translateRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  module.exports = app;
