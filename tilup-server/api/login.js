const User = require('../data/models/user');
const Directory = require('../data/models/directory');
const {
  getFirebaseUidWithToken,
  getFirebaseUserWithUid,
} = require('../data/firebase');
const { loginRequired } = require('../auth');
const {
  OkResponse,
  CreatedResponse,
} = require('../http/responses');
const {
  DatabaseError,
  BadRequestError,
} = require('../http/errors');


const _createUser = fbUser => new Promise((res, rej) => {
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
              res(createdUser);
            }
          });
      });
    });
});

module.exports = {
  login: ({ headers: { authorization } }, _) => new Promise((res, rej) => {
    Promise.resolve()
      .then(() => {
        if (!authorization) {
          rej(new BadRequestError());
        } else {
          Promise.resolve()
            .then(() => getFirebaseUidWithToken(authorization))
            .then(uid => getFirebaseUserWithUid(uid))
            .then((fbUser) => {
              User
                .findById(fbUser.uid)
                .exec((err, user) => {
                  if (user) {
                    res(new OkResponse(user));
                  } else {
                    _createUser(fbUser)
                      .then(createdUser => res(new CreatedResponse(createdUser)))
                      .catch(createdErr => rej(createdErr));
                  }
                });
            })
            .catch((err) => {
              rej(err);
            });
        }
      });
  }),
};
