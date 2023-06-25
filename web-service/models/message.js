const mongoose = require("mongoose");
const User = require("./user").schema;

const timeZone = require('mongoose-timezone');

const Message = new mongoose.Schema({
    created: {  
        type: Date,
        default: new Date()
    },

    sender: {
        type: User
    },

    content: {
        type: String,
        nullable: true
    }
});

Message.plugin(timeZone)
module.exports = mongoose.model('Message', Message);