const mongoose = require("mongoose");

const UserNoPass = new mongoose.Schema({
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
});

module.exports = mongoose.model("UserNoPass", UserNoPass);