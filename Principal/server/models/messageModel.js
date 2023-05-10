const mongoose = require('mongoose');
const User = require('../models/userModel');

const messageModel = mongoose.Schema(
    {
        content: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        }
    },
    {
        timestamps: true,
    }
)

const Message = mongoose.model("Message", messageModel);

module.exports = Message;