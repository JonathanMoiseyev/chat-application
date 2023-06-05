const tokenService = require('../services/token');

const createToken = async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await tokenService.createToken(username, password);
        return res.status(200).send(token);
    } catch (error) {
        return res.status(404).send("Invalid username or password");
    } 
}

const verifyToken = async (req, res, next) => {
    if (req.headers.authorization == null) {
        return res.status(403).send("Token required");    
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).send("No token provided");
    }

    try {
        req.username = tokenService.verifyToken(token).username;
        next();
    } catch (error) {
        return res.status(401).send("Unauthorized");
    }
}

module.exports = { createToken, verifyToken };