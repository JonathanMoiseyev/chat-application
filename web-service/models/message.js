const mongoose = require("mongoose");
const User = require("./user").schema;

const Message = new mongoose.Schema;({
    created: {  
        type: Date,
        default: Date.now
    },

    sender: {
        type: User
    },

    content: {
        type: String,
        nullable: true
    }
});

module.exports = mongoose.model('Message', Message);