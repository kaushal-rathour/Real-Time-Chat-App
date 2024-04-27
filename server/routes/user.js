const express = require("express");
const passport = require("passport");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const router = new express.Router();
const asyncHandler = require("express-async-handler");
const { isUserExist } = require("../middlewares/isUserExist");
const userController = require("../controller/user.js");

router.post("/register", asyncHandler(userController.register));

  router.get("/fetchusers", isLoggedIn, asyncHandler(userController.fetchUsers))

router.post("/login", isUserExist, passport.authenticate
("local", {session: false, failWithError: true, failureMessage: true }),
   asyncHandler(userController.login));

module.exports = router;