const jwt = require("jsonwebtoken");
const User = require("../models/user");
module.exports.decodeUser = async(token)=> {
    try {
        let decoded = jwt.verify(token, process.env.SECRET);
        let id = decoded.id || decoded._id;
        let user = await User.findById(id);
        if(user) {
            return user;
        }
    }catch(error) {
        return;
    }
    
    
}