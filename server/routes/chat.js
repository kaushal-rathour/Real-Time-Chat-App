const express = require("express");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const router = new express.Router();
const asyncHandler = require("express-async-handler");

const chatController = require("../controller/chat.js");


// Chat Routes
router.post("/chat", isLoggedIn, asyncHandler(chatController.createChat));

router.get("/chat", isLoggedIn, asyncHandler(chatController.fetchChat));

module.exports = router;