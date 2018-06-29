const express = require("express");
const path = require("path");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const routes = require("./routes/index");
const config = require("./config");

const elasticsearch = require("./elasticsearch");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.listen(config.SERVER_PORT, () => {
  console.log("Server is running on %d port", config.SERVER_PORT);
});

app.use("/", routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

elasticsearch.ping();
elasticsearch.indexExists().then(exist => {
  if (!exist) {
    elasticsearch.initIndex().then(elasticsearch.initMapping());
  }
});

module.exports = app;