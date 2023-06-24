const mongoose = require("mongoose");

const User = new mongoose.Schema({
    username: {
        type: String,
        nullable: true,
    },

    displayName: {
        type: String,
        nullable: true,
    },
    
    profilePic: {
        type: String,
        nullable: true,
    },

    androidToken: {
        type: String,
    }


});

module.exports = mongoose.model("User", User);