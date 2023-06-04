const chatsService = require('../services/chats');

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
    await chatsService.deleteChat(id);
}


const addChatMessage = async (req, res) => {
    const id = req.params.id;
    const { chat } = req.body;
    await chatsService.addChatMessage(chat);
}