const { UnauthorizedError } = require('../http/errors');


const loginRequired = func => (bindParams, user) => {
  if (user == null) {
    throw new UnauthorizedError();
  }

  return func.call(null, bindParams, user);
};

module.exports = {
  loginRequired,
};
