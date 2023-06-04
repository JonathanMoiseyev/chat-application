const User = require('../models/user');
const jwt = require("jsonwebtoken");

const secretKey = "Shhhhh...";

const createToken = async (username, password) => {
    const user = await User.find({ username });

    if (user.length === 0) {
        throw new Error('User not found');
    }

    if (user.password !== password) {
        throw new Error('Password is incorrect');
    }

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

module.exports = { createToken };