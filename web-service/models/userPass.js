const mongoose = require("mongoose");

const UserPass = new mongoose.Schema({
    username: {
        type: String,
        nullable: true,
    },

    password: {
        type: String,
        nullable: true,
    },
});

module.exports = mongoose.model("UserPass", UserPass);