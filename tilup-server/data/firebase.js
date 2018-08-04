const admin = require('firebase-admin');

const { DatabaseError } = require('../http/errors');
const { UnauthorizedError } = require('../http/errors');
const User = require('./models/user');
const serviceAccount = require('../firebase_secret.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


module.exports = {
  getFirebaseUidWithToken: token => new Promise((res, rej) => {
    admin.auth().verifyIdToken(token)
      .then((decodedToken) => {
        const {
          uid,
        } = decodedToken;
        res(uid);
      }).catch((error) => {
        if (error.code && error.code === 'auth/argument-error'
          && error.message.includes('auth/id-token-expired')) {
          rej(new UnauthorizedError(error.message));
        }
        rej(error);
      });
  }),

  getFirebaseUserWithUid: uid => new Promise((res, rej) => {
    admin.auth().getUser(uid)
      .then((userRecord) => {
        res(userRecord);
      })
      .catch((error) => {
        console.log('routes/index.js', 'getFirebaseUserWithUid', 'Error! admin.auth().getUser', 'error=', error);
        rej(error);
      });
  }),

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
