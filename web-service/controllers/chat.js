const chatsService = require('../services/chat');

const getChats = async (req, res) => {
    const username = req.body.username;
    try {
        const chats = await chatsService.getChats(username);
        return res.send({ chats });
    } catch (error) {
        return res.status(404).send({ error: error.message }); // check if its 404..........................
    }
}

const createChat = async (req, res) => {
    const { newContactUsername, username } = req.body;
    try {
        const newContactUser = await chatsService.createChat(username, newContactUsername);
        return res.status(200).send({ newContactUser });
    } catch (error) {
        return res.status(404).send({ error: error.message }); // check if its 404..........................
    }
}

const getChat = async (req, res) => {
    const id = req.params.id;
    try {
        const chat = await chatsService.getChat(id);
        return res.send({ chat });
    } catch (error) {
        return res.status(404).send({ error: error.message }); // check if its 404..........................
    }

}

const deleteChat = async (req, res) => {
    const id = req.body;
    
    try {
        await chatsService.deleteChat(id);
        return res.send({ message: "Chat deleted" });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}

const addChatMessage = async (req, res) => {
    const id = req.params.id;
    const { message } = req.body;

    try {
        await chatsService.addChatMessage(id, message);
        return res.send({ message });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}

const getChatMessage = async (req, res) => {
    const id = req.params.id;
    
    try {
        const messages = await chatsService.getChatMessages(id);
        return res.send({ messages });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}