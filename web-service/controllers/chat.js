const chatsService = require('../services/chat');

const getChats = async (req, res) => {
    const username = req.body.username;
    const chats = await chatsService.getChats(username);
    return res.send({ chats });
}

const getChat = async (req, res) => {
    const id = req.params.id;
    const chat = await chatsService.getChat(id);
    res.send({ chat });
}

const deleteChat = async (req, res) => {
    const id = req.body;
    await chatsService.deleteChat(id);
}

const addChatMessage = async (req, res) => {
    const id = req.params.id;
    const token = req.params.token;
    const { str } = req.body;
    await chatsService.addChatMessage(id, str, token);
}

const getChatMessage = async (req, res) => {
    const id = req.params.id;
    
    const output = await chatsService.getChatMessage(id);
    return output;
}