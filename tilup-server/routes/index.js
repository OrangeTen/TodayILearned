var express = require("express");
var router = express.Router();

const {
	userApi,
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
	.get("/til/:tilId", tilApi.getOne);

// router.get("/feed", apiResponse(feedApi.gedFeed));
router.get("/feed", feedApi.getFeedAll);

module.exports = router;