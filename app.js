var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userRouter = require('./routes/user');
var QuizRouter = require('./routes/quiz');

var mongoose = require('mongoose');
const url = "mongodb://localhost:27017/PiBase";
mongoose.connect(url,{ useNewUrlParser: true });
var mongo = mongoose.connection;

mongo.on('connected',()=>{
  console.log('ouvrir / initialiser connexion');
});

mongo.on('open',()=>{
  console.log('connexion etablie');
});

mongo.on('error',(err)=>{
  console.log(err);
});

var app = express();
app.use(cors());
var nodemailer = require("nodemailer");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', userRouter);
app.use('/', QuizRouter);


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
