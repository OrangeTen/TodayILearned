const { UnauthorizedError } = require('../errors');


const loginRequired = func => (bindParams, fbUser) => {
  if (fbUser == null) {
    throw new UnauthorizedError();
  }

  return func.call(null, bindParams, fbUser);
};

module.exports = {
  loginRequired,
};
