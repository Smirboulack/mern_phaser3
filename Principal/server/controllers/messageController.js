const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel');

const createMessage = asyncHandler(async (req, res) => {
    const {content, user} = req.body;

    if(!content || !user){
        res.status(401);
        throw new Error('Message invalide.');
    }

    const message = await Message.create({
        content,
        user
    });


    if(message){
        res.status(200).json({
            _id: message._id,
            content: message.content,
            user: user
        });
    }else{
        res.status(401);
        throw new Error('Message invalide.');
    }

});

const getMessages = asyncHandler(async (req, res) => {
    try{
        const messages = await Message.find({}).populate("user");
        res.json({messages})
    }catch(e){
        res.status(401);
        throw new Error(e);
    }
});

module.exports = {createMessage, getMessages};