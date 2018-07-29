const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');

const mongoose = require('./mongoose');
const config = require('./config');
const routes = require('./routes/index');


mongoose();
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
app.use(cookieParser());
app.use(methodOverride());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,DELETE');
    res.status(200).json({});
    return;
  }
  next();
});


app.listen(config.SERVER_PORT, () => {
  console.log('Server is running on %d port', config.SERVER_PORT);
});

app.use('/api', routes);
app.use('/search/*', express.static(getReactBuildPath()));
app.use('/repo/*', express.static(getReactBuildPath()));
app.use('/til/*', express.static(getReactBuildPath()));
app.use('/profile', express.static(getReactBuildPath()));
app.use('/', express.static(getReactBuildPath()));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function getReactBuildPath() {
  const splited = __dirname.split('/');
  splited.pop();
  const reactPath = `${splited.join('/')}/tilup-web/build`;
  return reactPath;
}

module.exports = app;
