var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const flash = require('express-flash');
const session = require('express-session');
var MongoStore = require('connect-mongodb-session')(session);
var passport = require('passport');
const dotenv = require('dotenv');

// autoIncrement = require('mongoose-auto-increment');


dotenv.config();


var db_uri = "mongodb://localhost:27017/BTA" ;

mongoose.connect(db_uri, { useNewUrlParser: true, useCreateIndex: true }).then(console.log("database connected")).catch(err => console.log(err));


// autoIncrement.initialize(connection);

 


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
require("./config/passport");


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
  secret: "mysecrect",
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ uri: db_uri, collection: "app_sessions" })
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);



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
