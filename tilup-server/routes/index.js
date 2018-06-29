var express = require("express");
var router = express.Router();

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

router.get("/directory", apiResponse())
	.post("/directory", apiResponse())
	.put("/directory", apiResponse())
	.delete("/directory", apiResponse());

router.get("/til", apiResponse())
	.post("/til", apiResponse())
	.put("/til", apiResponse())
	.delete("/til", apiResponse());

router.get("/feed", apiResponse());

module.exports = router;