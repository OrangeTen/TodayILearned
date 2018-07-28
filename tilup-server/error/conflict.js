class ConflictError extends Error {
  constructor(message) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'ConflictError';
    this.message = message;
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
