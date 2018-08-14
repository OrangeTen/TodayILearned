const { User } = require('./models');
const {
  DatabaseError,
} = require('../http/errors');


module.exports = {
  getUser: id => new Promise((res, _rej) => {
    if ((!id)) {
      throw new Error('Invalid parameters.');
    }

    User.findById(id)
      .exec((err, doc) => {
        if (err) {
          throw new DatabaseError(err);
        }

        res(doc);
      });
  }),

  getAllUsers: () => new Promise((res, _rej) => {
    User
      .find()
      .exec((err, users) => {
        if (err) {
          throw new DatabaseError(err);
        }

        res(users);
      });
  }),
};
