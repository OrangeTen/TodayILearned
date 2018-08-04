class DatabaseError extends Error {
  constructor(message) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'DatabaseError';
    this.message = message;
    this.statusCode = 500;
  }
}

module.exports = DatabaseError;
