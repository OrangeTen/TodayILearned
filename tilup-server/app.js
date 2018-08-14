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
app.use((error, req, res, _next) => {
  const statusCode = error.statusCode ? error.statusCode : 500;

  const defaultMessage = error.name ? error.name : '무언가 문제가 발생했습니다.';
  const message = error.message ? error.message : defaultMessage;

  res.status(statusCode).send({
    message,
  });
});

function getReactBuildPath() {
  const splited = __dirname.split('/');
  splited.pop();
  const reactPath = `${splited.join('/')}/tilup-web/build`;
  return reactPath;
}

module.exports = app;
