const User = require('../models/user');
const jwt = require("jsonwebtoken");

const createToken = async (username, password) => {
    const user = await User.find({ username });

    if (user === null) {
        throw new Error('User not found');
    }

    if (user.password !== password) {
        throw new Error('Password is incorrect');
    }

    return jwt.sign({ username }, "Shhhhh...")
}

module.exports = { createToken };