const mongoose = require("mongoose");
const User = require("./user");

const Int32 = require("mongoose-int32").loadType(mongoose);

const Schema = mongoose.Schema;

const Message = new Schema({
    id: {
        type: Int32
    },

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