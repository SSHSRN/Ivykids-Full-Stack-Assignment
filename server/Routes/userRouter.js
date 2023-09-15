const express = require("express");
const userController = require("../Controllers/userController");

const router = express.Router();

router.post("/signup", userController.sign_up);

module.exports = router;