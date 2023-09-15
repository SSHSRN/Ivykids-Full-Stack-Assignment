const express = require("express");
const userController = require("../Controllers/userController");

const router = express.Router();

router.post("/signup", userController.sign_up);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/verify", userController.verify);

module.exports = router;