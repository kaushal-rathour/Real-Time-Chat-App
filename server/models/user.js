const PassportLocal = require("passport-local-mongoose");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        trim: true, 
        unique: true,
        lowercase: true,
        maxLength: 16,
        validate: {
            validator: function(value) {
                const regex = /^[a-zA-Z0-9_]+$/;
                return regex.test(value);
            },
            message: props => `${props.value} is not a valid username. Only letters, numbers, and underscores are allowed.`,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

userSchema.plugin(PassportLocal);
module.exports = model("User", userSchema);