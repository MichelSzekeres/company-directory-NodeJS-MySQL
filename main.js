const path = require('path');
const logger = require('morgan');
const dotenv = require('dotenv');
const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');

const app = express();

const indexRouter = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev')); // logging only on locals
app.use(express.json()); //json encoding
app.use(express.urlencoded({ extended: false })); //url encoding
app.use(cookieParser()); //cookie handler
app.use(express.static(path.join(__dirname, 'public'))); //public folder

app.use('/', indexRouter);
app.use('/add', addEmployeeRouter);
app.use('/edit', addEmployeeRouter);
app.use('/remove', addEmployeeRouter);


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


//uncomment next line end comment export if the provider is checking for errors also if you do this do not forget to change "start" in "package.json"
//app.listen(8080, ()=>{ `Server is running on port ${process.env.PORT || 8080 }` })

module.exports = app;
