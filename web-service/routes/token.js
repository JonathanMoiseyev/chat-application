const tokenService = require('../services/token');

const createToken = async (req, res) => {
    const { username, password } = req.body;
    const token = await tokenService.createToken(username, password);
    res.send({ token });
}