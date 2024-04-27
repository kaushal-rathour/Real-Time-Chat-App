const User = require("../models/user");
const {generateToken} = require("../middlewares/generateToken.js");
module.exports.register = async (req, res, next) => {
    let { name, username, password, email } = req.body;
    let user = new User({ username, email, name });
    let newUser = await User.register(user, password);
    res.status(201).send({
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      _id: newUser._id,
      token: generateToken(newUser._id)
    });
}

module.exports.fetchUsers = async (req, res)=> {
    let user = await User.find({ _id: { $ne: req.user._id } });
    res.json(user);
}

module.exports.login = async (req, res) => {
    res.status(201).send({
    name: req.user.name,
    username: req.user.username,
    email: req.user.email,
    _id: req.user._id,
    token: generateToken(req.user._id)
  });
}