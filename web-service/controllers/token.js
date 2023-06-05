const user = require('../models/user');
const tokenService = require('../services/token');

const createToken = async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await tokenService.createToken(username, password);
        return res.status(200).send({ token });
    } catch (error) {
        return res.status(404).send({ error: "Invalid username or password" });
    } 
}

const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).send({ error: "No token provided" });
    }

    try {
        req.body.username = tokenService.verifyToken(token);
        next();
    } catch (error) {
        return res.status(401).send({ error: "Unauthorized" });
    }
}

module.exports = { createToken };