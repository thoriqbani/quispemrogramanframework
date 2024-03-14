var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require('express-flash')
const session = require('express-session')

var indexRouter = require('./routes/index');
var kapalRouter = require('./routes/kapal');
var dpiRouter = require('./routes/dpi');
// var pemilikRouter = require('./routes/pemilik');
var alattangkapRouter = require('./routes/alattangkap');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  cookie: {
    maxAge: 6000
  },
  store: new session.MemoryStore,
  saveUninitialized: true,
  resave: 'true',
  secret: 'secret'
}))

app.use(flash())

app.use('/', indexRouter);
app.use('/kapal', kapalRouter);
app.use('/dpi', dpiRouter);
// app.use('/pemilik', pemilikRouter);
app.use('/alattangkap', alattangkapRouter);

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
