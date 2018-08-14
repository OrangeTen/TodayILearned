class BadRequestError extends Error {
  constructor(message) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'BadRequestError';
    this.message = message;
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
