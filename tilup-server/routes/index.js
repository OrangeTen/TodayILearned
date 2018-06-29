var express = require("express");
var router = express.Router();

const {
	feedApi,
	tilApi,
	directoryApi
} = require('../api');

const {
	apiResponse
} = require('../http');

/* GET home page. */
router.get("/", (req, res) => {
	return res.send("Hello world");
});

router.get("/login", apiResponse());

router.get("/me", apiResponse())
	.put("/me", apiResponse())
	.delete("/me", apiResponse());

router.get("/users", apiResponse())
	.post("/users/follow", apiResponse())
	.delete("/users/follow", apiResponse());

router.get("/directory", directoryApi.get)
	.post("/directory", directoryApi.add)
	.put("/directory", apiResponse())
	.delete("/directory", apiResponse());

router.get("/til", tilApi.get)
	.post("/til", tilApi.add)
	.put("/til", apiResponse())
	.delete("/til", apiResponse());

// router.get("/feed", apiResponse(feedApi.gedFeed));
router.get("/feed", (req, res) => {
	res.send(feedApi.getFeed());
});

module.exports = router;