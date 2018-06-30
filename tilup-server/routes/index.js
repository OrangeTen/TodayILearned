var express = require("express");
var router = express.Router();
var admin = require('firebase-admin');
var serviceAccount = require('../firebase_secret.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

const {
	userApi,
	feedApi,
	tilApi,
	directoryApi,
	meApi,
	searchApi,
	loginApi
} = require('../api');

const {
	apiResponse
} = require('../http');

/* GET home page. */
router.get("/", (req, res) => {
	return res.send("Hello world");
});

function verifyFirebase(req, res, next) {
	const token = req.headers.authorization;
	if(typeof token == "undefined"){
		req.uid = null;
		return next();
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

function getFirebaseUidWithToken(token) {
	return new Promise((res, rej) => {

		admin.auth().verifyIdToken(token)
			.then(decodedToken => {
				var uid = decodedToken.uid;
				console.log("This is uid!  :  " + uid);
				res(uid);
			}).catch(error => {
				res(null);
			});
	});
}


router.get("/login", verifyFirebase, (req, res, next) => {
	admin.auth().getUser(req.uid)
		.then((userRecord) => {
			req.userRecord = userRecord;
			loginApi.login(req, res, next);
		})
		.catch(function (error) {
			console.log("Error fetching user data:", error);
		});
});

router.get("/me", meApi.get);

router.get("/users", verifyFirebase, userApi.getOne)
	.post("/users", verifyFirebase, userApi.add)
	.put("/users/follow", verifyFirebase, userApi.updateFollow);

router.get("/directory", verifyFirebase, directoryApi.getMyDir)
	.post("/directory", verifyFirebase, directoryApi.add);

router.get("/til/:tilId", tilApi.getOne)
	.post("/til", verifyFirebase, tilApi.add)
	.post("/til/fork", verifyFirebase, tilApi.fork)
	.put("/til/directory/:tilId", tilApi.changeDir);		// 연동 test 필요

router.get("/feed", verifyFirebase, feedApi.getFeed)
	.get("/feed/my", verifyFirebase, feedApi.getMyFeed);

router.get("/search/contents/:word", verifyFirebase, searchApi.searchContents)
	.get("/search/hash/:word", verifyFirebase, searchApi.searchHash)
	.get("/search/:word", feedApi.getFeedWord);
	//.get("/search/:word", verifyFirebase, searchApi.searchBoth)

router.get("/admin/users", userApi.get)
	.get("/admin/directory", directoryApi.get)
	.get("/admin/til",tilApi.get)
	.get("/admin/feed", feedApi.getAllFeed);

module.exports = router;