const mongoose = require("mongoose");
const User = require("./user").schema;

const Message = new mongoose.Schema;({
    created: {  
        type: String
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