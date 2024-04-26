const jwt = require("jsonwebtoken");

module.exports.generateToken = (id)=> {
    return jwt.sign({id}, process.env.SECRET, {expiresIn: "7d"});
}
