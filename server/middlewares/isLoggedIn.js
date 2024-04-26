const jwt = require("jsonwebtoken");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const ExpressError = require("../helper/ExpressError");

module.exports.isLoggedIn = asyncHandler(async(req, res, next) => {
    let token = req.headers['authorization'];
    if(token) {
      try {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = await User.findById(decoded.id);
      if(!req.user) {
        throw new ExpressError(401, "User Not Authorized");
      }
      next();
      }catch(err) {
        throw new ExpressError(401, "User Not Authorized");
      }
    }else {
      throw new ExpressError(401, "User Not Authorized");
    }
  });
  