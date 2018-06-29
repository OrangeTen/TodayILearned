var express = require("express");
var router = express.Router();

const {
	userApi,
	feedApi,
	tilApi,
	directoryApi,
	meApi
} = require('../api');

const {
	apiResponse
} = require('../http');

/* GET home page. */
router.get("/", (req, res) => {
	return res.send("Hello world");
});

router.get("/login", apiResponse());

router.get("/me", meApi.get);

router.get("/users", userApi.get)
	.post("/users", userApi.add)
	.get("/users/:userId", userApi.getOne)
	.put("/users/follow", userApi.updateFollow)

router.get("/directory", directoryApi.get)
	.post("/directory", directoryApi.add)
	.put("/directory", apiResponse())
	.delete("/directory", apiResponse());

router.get("/til", tilApi.get)
	.post("/til", tilApi.add)
	.put("/til", apiResponse())
	.delete("/til", apiResponse())
	.get("/til/:tilId", tilApi.getOne)
	.post("/til/fork", tilApi.fork);

router.get("/feed", feedApi.getAllFeed);
router.get("/feed/:uid", feedApi.getFeed);
router.get("/feed/my/:uid", feedApi.getMyFeed);

module.exports = router;