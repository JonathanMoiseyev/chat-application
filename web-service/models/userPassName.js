const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserPassName = new Schema({
    username: {
        type: String,
        nullable: true
    },
    password: {
        type: String,
        nullable: true
    },
    displayName: {
        type: String,
        nullable: true
    },
    profilePic: {
        type: String,
        nullable: true
    }
});

module.exports = mongoose.model('UserPassName', UserPassName);