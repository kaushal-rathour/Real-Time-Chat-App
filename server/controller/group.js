const Chat = require("../models/chat");
const ExpressError = require("../helper/ExpressError");

module.exports.createGroup = async(req, res)=> {
    if(!req.body.participants || !req.body.name) {
      return res.status(400).send({message: "Data is insufficient"})
    }
    let {participants, name} = req.body;
  
    let groupChat = await Chat.create({
      chatName: name,
      participants: participants,
      isGroupChat: true,
      groupAdmin: req.user
    });
    let fullGroupChat = await Chat.findOne({id: groupChat._id})
    .populate("participants")
    .populate("groupAdmin");
  
    res.status(200).send(fullGroupChat);
  }

module.exports.fetchGroups = async(req, res)=> {
    let groups = await Chat.where("isGroupChat").equals(true);
    res.status(200).send(groups);
}

module.exports.addSelfToGroup = async(req, res)=> {
    let {chatId, userId} = req.body;
    let added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: {participants: userId},
      },
      {
        new: true
      }
    ).populate("participants")
    .populate("groupAdmin")
    if(!added) {
      throw new ExpressError(400, "Chat Not Found");
    }else {
      res.send(added);
    }
}

module.exports.exitGroup = async(req, res)=> {
    let {chatId, userId} = req.body;
    let removed = await Chat.findByIdAndUpdate(chatId)
    .populate("participants")
    .populate("groupAdmin")

    if(!removed) {
      throw new ExpressError(400, "Chat Not Found");
    }else {
      res.status(200).send(removed);
    }
};