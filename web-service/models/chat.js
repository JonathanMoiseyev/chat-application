const mongoose = require("mongoose");
const User = require("./user").schema;
const Message = require("./message").schema;

const Chat = new mongoose.Schema({
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