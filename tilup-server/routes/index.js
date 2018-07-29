const express = require('express');

const router = express.Router();
const admin = require('firebase-admin');
const serviceAccount = require('../firebase_secret.json');

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


function getFirebaseUidWithToken(token) {
  return new Promise((res, _) => {
    admin.auth().verifyIdToken(token)
      .then((decodedToken) => {
        const {
          uid,
        } = decodedToken;
        console.log(`This is uid!  :  ${uid}`);
        res(uid);
      }).catch((_err) => {
        res(null);
      });
  });
}

function verifyFirebase(req, res, next) {
  const token = req.headers.authorization;
  if (typeof token === 'undefined') {
    req.uid = null;
    next();
    return;
  }
  getFirebaseUidWithToken(token)
    .then((uid) => {
      req.uid = uid;
    })
    .catch((err) => {
      res.status(404).send(err);
    })
    .then(() => {
      next();
    });
}


router.get('/login', verifyFirebase, (req, res, next) => {
  admin.auth().getUser(req.uid)
    .then((userRecord) => {
      req.userRecord = userRecord;
      loginApi.login(req, res, next);
    })
    .catch((error) => {
      console.log('Error fetching user data:', error);
    });
});

router.get('/me', meApi.get);

router.get('/users', verifyFirebase, apiResponse(userApi.getOne))
  .post('/users', verifyFirebase, apiResponse(userApi.add))
  .put('/users/follow', verifyFirebase, apiResponse(userApi.updateFollow));

router.get('/directory', verifyFirebase, apiResponse(directoryApi.getMyDir))
  .post('/directory', verifyFirebase, apiResponse(directoryApi.add));

router.get('/til/:tilId', apiResponse(tilApi.getOne))
  .post('/til', verifyFirebase, apiResponse(tilApi.add))
  .post('/til/fork', verifyFirebase, apiResponse(tilApi.fork))
  .put('/til/directory/:tilId', apiResponse(tilApi.changeDir)); // 연동 test 필요

router.get('/feed', verifyFirebase, apiResponse(feedApi.getFeed))
  .get('/feed/my', verifyFirebase, apiResponse(feedApi.getMyFeed));

router.get('/search/contents/:word', verifyFirebase, apiResponse(searchApi.searchContents))
  .get('/search/hash/:word', verifyFirebase, apiResponse(searchApi.searchHash))
  .get('/search/:word', apiResponse(feedApi.getFeedWord));
// .get("/search/:word", verifyFirebase, apiResponse(searchApi.searchBoth))

router.get('/admin/users', apiResponse(userApi.get))
  .get('/admin/directory', apiResponse(directoryApi.get))
  .get('/admin/til', apiResponse(tilApi.get))
  .get('/admin/feed', apiResponse(feedApi.getAllFeed));

module.exports = router;
