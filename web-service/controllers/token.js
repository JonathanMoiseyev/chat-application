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

module.exports = { createToken };