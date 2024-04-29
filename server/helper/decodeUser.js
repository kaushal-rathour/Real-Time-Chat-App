const jwt = require("jsonwebtoken");
const User = require("../models/user");
module.exports.decodeUser = async(token)=> {
    try {
        let decoded = jwt.verify(token, process.env.SECRET);
        let user = await User.findById(decoded.id);
        console.log("Decode User: "+decoded.id);
        if(user) {
            return user;
        }
    }catch(error) {
        return;
    }
    
    
}