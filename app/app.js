const http = require('http');
const express = require('express');
const path = require('path');
const app = express();

function log(req, res, next) {
  console.log(new Date(), req.method, req.url);
  next();
}
function welcome(req, res) {
  res.send('Hallo');
}
function listUsers(req, res) {
  res.send({ users: ['Piet', 'Jan', 'Marie'] });
}

function addUser(req, res) {
  res.send('User added');
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/users', listUsers);
app.post('/users', addUser);
app.use('/', welcome, log);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

http.createServer(app).listen(3000, () => {
  console.log('Gestart op http://localhost:3000');
});

module.exports = app;