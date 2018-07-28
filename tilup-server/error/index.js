const UnauthorizedError = require('./unauthorized');
const NotExistError = require('./none');
const ConflictError = require('./conflict');
const BadRequestError = require('./bad');
const ForbiddenError = require('./forbidden');

module.exports = {
  UnauthorizedError,
  NotExistError,
  ConflictError,
  BadRequestError,
  ForbiddenError,
};
