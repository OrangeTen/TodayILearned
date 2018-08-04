const express = require('express');

const {
  getUserWithFbUser,
  getFirebaseUidWithToken,
  getFirebaseUserWithUid,
} = require('../data/firebase');


const router = express.Router();

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


function _getUserTokenWithReq(req) {
  return new Promise((res, _rej) => {
    const {
      headers: {
        authorization: token,
      },
    } = req;

    if (token) {
      res(token);
    } else {
      // console.log('routes/index.js', 'getUserTokenWithReq', "Token doesn't exist", 'req=', req);
      res();
    }
  });
}

function getUserFromHeader(req, res, next) {
  return Promise.resolve()
    .then(() => _getUserTokenWithReq(req))
    .then((token) => {
      if (!token) {
        next();
      } else {
        Promise.resolve()
          .then(() => getFirebaseUidWithToken(token))
          .then(uid => getFirebaseUserWithUid(uid))
          .then(fbUser => getUserWithFbUser(fbUser))
          .then((user) => {
            req.user = user;
          })
          .catch((err) => {
            console.log('routes/index.js', 'getUserFromHeader', 'err=', err);
            req.user = null;
          })
          .then(() => {
            next();
          });
      }
    });
}


router.use(getUserFromHeader);
router.get('/login', apiResponse(loginApi.login));

router.get('/me', meApi.get);

router.get('/users', apiResponse(userApi.getOne))
  .post('/users', apiResponse(userApi.add))
  .put('/users/follow', apiResponse(userApi.updateFollow));

router.get('/directory', apiResponse(directoryApi.getMyDir))
  .post('/directory', apiResponse(directoryApi.add))
  .delete('/directory/:directoryId', apiResponse(directoryApi.del));

router.get('/til/:tilId', apiResponse(tilApi.getOne))
  .delete('/til/:tilId', apiResponse(tilApi.del))
  .put('/til/:tilId', apiResponse(tilApi.update))
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
