const mongoose = require("mongoose");
const User = require("./user");

const Int32 = require("mongoose-int32").loadType(mongoose);

const Schema = mongoose.Schema;

const Chat = new Schema({
    id: {
        type: Int32
    },

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