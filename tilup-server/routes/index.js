var express = require("express");
var router = express.Router();

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

router.get("/login", apiResponse());

router.get("/me", meApi.get);

router.get("/users", userApi.get)
	.post("/users", userApi.add)
	.get("/users/:userId", userApi.getOne)
	.put("/users/follow", userApi.updateFollow)

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