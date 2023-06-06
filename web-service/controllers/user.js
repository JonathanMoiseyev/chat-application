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
        return res.status(200).send("User created");
    } catch (error) {
        return res.status(409).send("User already exists");
    }
}

const getUser = async (req, res) => {
    const username = req.username;

    try {
        const user = await userServices.getUser(username);
        return res.status(200).send(user);
    } catch (error) {
        return res.status(404).send("User not found");
    }
}

module.exports = { createUser, getUser };
