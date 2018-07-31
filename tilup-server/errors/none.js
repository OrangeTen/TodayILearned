class NotExistError extends Error {
  constructor(message) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'NotExistError';
    this.message = message;
    this.statusCode = 404;
  }
}

module.exports = NotExistError;
