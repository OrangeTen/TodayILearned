class ForbiddenError extends Error {
  constructor(message) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'ForbiddenError';
    this.message = message;
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
