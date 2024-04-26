const User = require("../models/user")

module.exports.isUserExist = async(req, res, next)=> {
    let {username} = req.body;
    let user = await User.findOne({username});
    if(!user) {
         let error = new Error ("User does'nt exist");
         error.status = 501;
         next(error);
    }
    next();
}