const userServices = require("../services/user");
const { tokenServices } = require("../services/token");

const createUser = async (req, res) => {
    const { username, password, displayName, profilePic } = req.body;

    try {
        await userServices.createUser(
            username,
            password,
            displayName,
            profilePic
        );
        return res.status(200).send({ message: "User created" });
    } catch (error) {
        return res.status(409).send({ error: "User already exists" });
    }
}

const getUser = async (req, res) => {
    const token = req.params.token;

    try {
        const username = tokenServices.verifyToken(token);

        try {
            const user = await userServices.getUser(username);
            return res.status(200).send(user);
        } catch (error) {
            return res.status(404).send({ error: "User not found" });
        }
    } catch (error) {
        return res.status(401).send({ error: "Invalid token" });
    }
}

module.exports = { createUser, getUser };
