const chatsService = require('../services/chat');

const getChats = async (req, res) => {
    const chats = await chatsService.getChats();
    res.send({ chats });
}

const getChat = async (req, res) => {
    const id = req.params.id;
    const chat = await chatsService.getChat(id);
    res.send({ chat });
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