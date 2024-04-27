const express = require("express");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const router = new express.Router();
const asyncHandler = require("express-async-handler");
const groupController = require("../controller/group");

router.post("/creategroup", isLoggedIn, asyncHandler(groupController.createGroup));

router.get("/fetchgroups", isLoggedIn, asyncHandler(groupController.fetchGroups));

router.put("/addselftogroup", isLoggedIn, asyncHandler(groupController.addSelfToGroup));

router.post("/exitgroup", asyncHandler(groupController.exitGroup));

module.exports = router;
