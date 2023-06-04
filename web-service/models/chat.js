const mongoose = require("mongoose");
const User = require("./user");
const Message = require("./message");
const Schema = mongoose.Schema;

const Chat = new Schema({
    users: {
        type: [User],
        nullable: true
    },
    
    messages: {
        type: [Message],
        nullable: true
    }
});

module.exports = mongoose.model('Chat', Chat);