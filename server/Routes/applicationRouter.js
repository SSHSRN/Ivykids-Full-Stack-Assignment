const express = require("express");
const applicationController = require("../Controllers/applicationController");

const router = express.Router();

router.post("/add", applicationController.add_tweet);
router.post("/delete", applicationController.delete_tweet);
router.get("/search", applicationController.search_user);

module.exports = router;