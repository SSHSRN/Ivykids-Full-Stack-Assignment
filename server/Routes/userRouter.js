const express = require("express");
const userController = require("../Controllers/userController");

const router = express.Router();

router.post("/signup", userController.sign_up);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/verify", userController.verify);
router.post("/getuser", userController.get_user);
router.post("/follow", userController.follow_user);
router.post("/unfollow", userController.unfollow_user);

module.exports = router;