var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');


const mongoose = require('mongoose');
const expressGraphQl = require('express-graphql');
const bodyParser = require('body-parser');
const cors = require('cors');

var app = express();
//MongoDb
const db ="mongodb://127.0.0.1:27017/sfm";
//GrahphQL schema
const schema  =require('./controller/GraphQl/index.js');
mongoose.connect(
    db,
    {
      useCreateIndex:true,
      useNewUrlParser:true
    }
    ).then(()=> console.log('MongoDB connected')).catch( err => console.log(err));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use(
    "/graphQl",
    cors(),
    bodyParser.json(),
    expressGraphQl({
      schema,
      graphiql:true
    })
    );

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
