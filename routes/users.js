const express = require("express");
const router = express.Router();

const path = require("path");

const userController = require("../controllers/users");


router.get("/signupForm", userController.signupForm);
router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.get("/loginForm", userController.loginForm)


module.exports.routes = router;
