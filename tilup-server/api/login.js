const User = require('../data/user');
const Directory = require('../data/directory');
const { loginRequired } = require('../auth');
const { OkResponse } = require('../http/responses');
const {
  DatabaseError,
} = require('../http/errors');


module.exports = {
  login: loginRequired((_, fbUser) => new Promise((res, rej) => {
    User
      .findById(fbUser.uid)
      .exec((err, user) => {
        if (user) {
          res(new OkResponse(user));
        }

        if (!user) {
          const newUser = new User({
            _id: fbUser.uid,
            email: fbUser.email,
            name: fbUser.displayName,
            profileUrl: fbUser.photoURL,
          });
          newUser
            .save((newUserErr) => {
              if (newUserErr) {
                rej(new DatabaseError(newUserErr));
              }
              const directory = new Directory({ name: 'Inbox', uid: newUser._id });
              directory.save((directoryErr) => {
                if (directoryErr) rej(new DatabaseError(directoryErr));

                User
                  .findById(fbUser.uid)
                  .exec((createdUserFindError, createdUser) => {
                    if (createdUserFindError) {
                      rej(new DatabaseError(createdUserFindError));
                    }

                    if (createdUser) {
                      res(new OkResponse(createdUser));
                    }
                  });
              });
            });
        }
      });
  })),
};
