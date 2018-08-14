class UnauthorizedError extends Error {
  constructor(message) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'UnauthorizedError';
    this.message = message;
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
