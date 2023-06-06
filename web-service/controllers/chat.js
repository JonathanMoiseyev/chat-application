const chatsService = require('../services/chat');

const getChats = async (req, res) => {
    const username = req.username;

    try {
        const chats = await chatsService.getChats(username);
        return res.send(chats);
    } catch (error) {
        return res.status(404).send(error.message); // check if its 404..........................
    }
}

const createChat = async (req, res) => {
    const newContactUsername = req.body.username;
    const username = req.username;

    try {
        const newContactUser = await chatsService.createChat(username, newContactUsername);
        return res.status(200).send(newContactUser);
    } catch (error) {
        return res.status(404).send(error.message); // check if its 404..........................
    }
}

const getChat = async (req, res) => {
    const id = req.params.id;

    try {
        const chat = await chatsService.getChat(id);
        return res.send(chat);
    } catch (error) {
        return res.status(404).send(error.message); // check if its 404..........................
    }
}

const deleteChat = async (req, res) => {
    const id = req.body;
    
    try {
        await chatsService.deleteChat(id);
        return res.send("Chat deleted");
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const addChatMessage = async (req, res) => {
    const chatId = req.params.id;
    const { msg } = req.body;
    const username = req.username;

    try {
        const messageJson = await chatsService.addChatMessage(chatId, username, msg);
        return res.send(messageJson);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const getChatMessage = async (req, res) => {
    const id = req.params.id;
    
    try {
        const messages = await chatsService.getChatMessages(id);
        return res.send(messages);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

module.exports = { getChats, createChat, getChat, deleteChat, addChatMessage, getChatMessage };