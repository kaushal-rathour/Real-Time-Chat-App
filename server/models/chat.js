const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const chatSchema = new Schema({
    chatName: {
        type: String,
    },
    latestMessage: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    isGroupChat: {
        type: Boolean
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    groupAdmin: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    timeStamp: {
        type: Date,
        default: Date.now,
    }
})

module.exports = model("Chat", chatSchema);