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
	searchApi
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
				rej(error);
			});
	});
}


router.get("/login", verifyFirebase, (req, res, next) => {
	admin.auth().getUser(req.uid)
		.then(function (userRecord) {
			// See the UserRecord reference doc for the contents of userRecord.
			// uid, email, displayName, photoURL
			console.log("Successfully fetched user data:", userRecord.toJSON());
		})
		.catch(function (error) {
			console.log("Error fetching user data:", error);
		});
});

router.get("/me", meApi.get);

router.get("/users", verifyFirebase, userApi.getOne)
	.post("/users", verifyFirebase, userApi.add)
	.put("/users/follow", verifyFirebase, userApi.updateFollow)

router.get("/directory", directoryApi.get)
	.get("/directory/:uid", directoryApi.getMyDir)
	.post("/directory", directoryApi.add)
	.put("/directory", apiResponse())
	.delete("/directory", apiResponse());

router.get("/til", tilApi.get)
	.post("/til", tilApi.add)
	.put("/til/directory/:tilId", tilApi.changeDir)
	.delete("/til", apiResponse())
	.get("/til/:tilId", tilApi.getOne)
	.post("/til/fork", tilApi.fork);

router.get("/feed", feedApi.getAllFeed)
	.get("/feed/:uid", feedApi.getFeed)
	.get("/feed/my/:uid", feedApi.getMyFeed);

router.get("/search/:uid/:word", searchApi.searchBoth)
	.get("/search/contents/:uid/:word", searchApi.searchContents)
	.get("/search/hash/:uid/:word", searchApi.searchHash);

module.exports = router;