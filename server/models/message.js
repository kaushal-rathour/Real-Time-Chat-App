const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    timeStamp: {
        type: Date,
        default: Date.now,
    }
})

module.exports = model("Message", messageSchema);