const { DatabaseError } = require('../http/errors');
const User = require('./models/user');

module.exports = {
  getUserWithFbUser: fbUser => new Promise((res, rej) => {
    User
      .findById(fbUser.uid)
      .exec((err, user) => {
        if (err) {
          rej(new DatabaseError('Signup first.', err));
        }
        res(user);
      });
  }),
};
