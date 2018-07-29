const User = require('../data/user');
const {
  NotExistError,
} = require('../error');

module.exports = {
  get(req, res, _next) {
    User
      .findOne({
        token: req.query.token,
      })
      .exec((err, user) => {
        if (err) {
          throw new NotExistError(err);
        }
        res.send(user);
      });
  },
};
