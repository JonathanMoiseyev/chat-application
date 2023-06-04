const tokenService = require('../services/tokens');

const createToken = async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await tokenService.createToken(username, password);
        res.send({ token });
    } catch (error) {
        res.status(401).send({ error: "Invalid username or password" });
    } 
}

module.exports = { createToken };