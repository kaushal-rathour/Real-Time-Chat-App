const ExpressError = require("../helper/ExpressError");
const Chat = require("../models/chat");
const User = require("../models/user");

module.exports.createChat = async(req, res)=> {
    const {userId} = req.body;
    if(!userId) {
      console.log("UserId Param Not Exist");
      return res.sendStatus(400);
    }
    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        {participants: {$elemMatch: {$eq: req.user._id } }},
        {participants: {$elemMatch: {$eq: userId } }},
      ]
    }).populate("participants").populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name email"
    });

    if(isChat.length > 0 ) {
      res.send(isChat[0]);
    }else {
      let chatData = {
        chatName: "sender",
        isGroupChat: false,
        participants: [req.user.id, userId],
      };
      try {
        const createdChat = await Chat.create(chatData);
        const fullChat = await Chat.findOne({_id: createdChat._id}).select("participants");
        res.status(200).json(fullChat);
      }catch(error) {
        console.log(error);
          throw new ExpressError(400, error.message);
      }
    }
}

module.exports.fetchChat = async(req, res) => {
  let chats = await Chat.find({ participants: { $elemMatch: { $eq: req.user._id } } })
    .populate("participants")
    .populate("groupAdmin")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });

  chats = await User.populate(chats, {
    path: "latestMessage.sender",
    select: "name email"
  });
  res.status(200).send(chats);
}