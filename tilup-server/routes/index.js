const express = require('express');
const admin = require('firebase-admin');

const { UnauthorizedError } = require('../errors');
const serviceAccount = require('../firebase_secret.json');


const router = express.Router();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const {
  userApi,
  feedApi,
  tilApi,
  directoryApi,
  meApi,
  searchApi,
  loginApi,
} = require('../api');

const {
  apiResponse,
} = require('../http');


function getFirebaseUserRecord(req, res, next) {
  return Promise.resolve()
    .then(() => getUserTokenWithReq(req))
    .then((token) => {
      if (!token) {
        next();
      } else {
        Promise.resolve()
          .then(() => getFirebaseUidWithToken(token))
          .then(uid => getFirebaseUserWithUid(uid))
          .then((user) => {
            req.fbUser = user;
          })
          .catch((err) => {
            next(err);
          })
          .then(() => {
            next();
          });
      }
    });
}

function getUserTokenWithReq(req) {
  return new Promise((res, _rej) => {
    const {
      headers: {
        authorization: token,
      },
    } = req;

    if (token) {
      res(token);
    } else {
      console.log('routes/index.js', 'getUserTokenWithReq', "Token doesn't exist", 'req=', req);
      res();
    }
  });
}

function getFirebaseUserWithUid(uid) {
  return new Promise((res, rej) => {
    admin.auth().getUser(uid)
      .then((userRecord) => {
        res(userRecord);
      })
      .catch((error) => {
        console.log('routes/index.js', 'getFirebaseUserWithUid', 'Error! admin.auth().getUser', 'error=', error);
        rej(error);
      });
  });
}

function getFirebaseUidWithToken(token) {
  return new Promise((res, rej) => {
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
  });
}


router.use(getFirebaseUserRecord);
router.get('/login', apiResponse(loginApi.login));

router.get('/me', meApi.get);

router.get('/users', apiResponse(userApi.getOne))
  .post('/users', apiResponse(userApi.add))
  .put('/users/follow', apiResponse(userApi.updateFollow));

router.get('/directory', apiResponse(directoryApi.getMyDir))
  .post('/directory', apiResponse(directoryApi.add));

router.get('/til/:tilId', apiResponse(tilApi.getOne))
  .post('/til', apiResponse(tilApi.add))
  .post('/til/fork', apiResponse(tilApi.fork))
  .put('/til/directory/:tilId', apiResponse(tilApi.changeDir)); // 연동 test 필요

router.get('/feed', apiResponse(feedApi.getFeed))
  .get('/feed/my', apiResponse(feedApi.getMyFeed));

router.get('/search/contents/:word', apiResponse(searchApi.searchContents))
  .get('/search/hash/:word', apiResponse(searchApi.searchHash))
  .get('/search/:word', apiResponse(feedApi.getFeedWord));
// .get("/search/:word", apiResponse(searchApi.searchBoth))

router.get('/admin/users', apiResponse(userApi.get))
  .get('/admin/directory', apiResponse(directoryApi.get))
  .get('/admin/til', apiResponse(tilApi.get))
  .get('/admin/feed', apiResponse(feedApi.getAllFeed));

module.exports = router;
