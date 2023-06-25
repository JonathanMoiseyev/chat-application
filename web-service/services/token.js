const UserPass = require('../models/userPass');
const User = require('../models/user');
const jwt = require("jsonwebtoken");

const secretKey = "Shhhhh...";

const createToken = async (username, password, androidToken) => {
    var user = await UserPass.findOne({ username });

    if (user === null) {
        throw new Error('User not found');
    }

    if (user.password !== password) {
        throw new Error('Password is incorrect');
    }

    await User.findOneAndUpdate({ username }, { androidToken });
    return jwt.sign({ username }, secretKey)
}

const verifyToken = (token) => {
    try {
        const data = jwt.verify(token, secretKey);
        return data;
    } catch (err) {
        throw new Error('Invalide token');
    }
}

module.exports = { createToken, verifyToken };