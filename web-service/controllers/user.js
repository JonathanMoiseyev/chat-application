const userServices = require("../services/user");

const createUser = async (req, res) => {
    const { username, password, displayName, profilePic } = req.body;

    try {
        await userServices.createUser(
            username,
            password,
            displayName,
            profilePic
        );
        res.status(201).send({ message: "User created" });
    } catch (error) {
        res.status(401).send({ error: "Invalid username or password" });
    }
}

const getUser = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await userServices.getUser(username);
        res.status(200).send(user);
    } catch (error) {
        res.status(404).send({ error: "User not found" });
    }
}

module.exports = { createUser, getUser };
