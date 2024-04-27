const express = require("express");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const router = new express.Router();
const asyncHandler = require("express-async-handler");
const messageController = require("../controller/message.js");

router.post("/message", isLoggedIn, asyncHandler(messageController.sendMessage));
  
router.get("/message/:chatId", isLoggedIn, asyncHandler(messageController.fetchMessage))
  
module.exports = router;
  