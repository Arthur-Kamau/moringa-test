var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sequelize = require("./database");
const bcrypt = require('bcrypt');

//model
const userModel = require("./model/user");

// routes 
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var commentRouter = require('./routes/comment');

// passport 
// const passport = require('passport');

var app = express();


// database
async function dbConnect(params) {
  try {
    await sequelize.authenticate();
    // console.log('Connection has been established successfully.');
    await sequelize.sync();
    // console.log('tables created ...');

    //create a dummy user
    const hashedPassword = await bcrypt.hash("sample", 10)
    const artTyp1 = await userModel.create({ name: "sample", email: "sample@mail.com", password: hashedPassword });
    
    await artTyp1.save();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

dbConnect();






// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// routes

//routes that require auth
// app.use('/likes', passport.authenticate('jwt', { session: false }), likesRouter);

// route that does not require auth
app.use('/comment', commentRouter);
app.use('/user', userRouter);
//default route 
app.use('/', indexRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
