const Chat = require("../models/chat");
const Message = require("../models/message");


module.exports.fetchMessage = async(req, res)=> {
  const { chatId } = req.params;
    let messages = await Message.find({ chat: chatId }).populate("sender");
    res.status(200).json(messages);
}


module.exports.sendMessage = async(req, res)=> {
    const { chatId, content } = req.body;
    const sender = req.user._id;
    const chat = await Chat.findById(chatId);
    const participants = chat.participants;
    const receiver = participants.find(participant => participant.toString() !== sender.toString());
    const newMessage = new Message({
            sender: sender,
            receiver: receiver,
            content: content,
            chat: chatId
        });
        let response = await newMessage.save();
        chat.latestMessage = response._id;
        await chat.save();
        res.sendStatus(200);
}
