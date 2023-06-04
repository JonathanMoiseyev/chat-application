const Chat = require("../models/chat");
const Message = require("../models/Message");

const getChats = async (token) => {
    
};

const getChat = async (id) => {
    const chat = await Chat.find({ id });

    if (chat == null) {
        throw new Error("Chat not found");
    } else {
        return chat;
    }
};

const deleteChat = async (id) => {
    await Chat.deleteById({ id }); // TODO: ????/......
};

const addChatMessage = async (id, messageStr) => {
    const chat = await Chat.find({ id }); // TODO: ????/......

    const msg = await Message.save({
        created: Date.now().toString,
        sender: getCurrentUser(),
        content: messageStr,
    });

    chat.messages.push(msg);
};
