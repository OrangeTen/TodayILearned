class InternalError extends Error {
  constructor(message) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'InternalError';
    this.message = message;
    this.statusCode = 500;
  }
}

module.exports = InternalError;
