const Chat = require("../models/chat");
const User = require("../models/user");
const Message = require("../models/Message");

const getChats = async (username) => {
    const chats = await Chat.find({ users : {$elemMatch : {username : username}}});
    
    if (chats.length == 0) {
        throw new Error("Chats not found");
    }

    return chats;
};

const createChat = async (username, newContactUsername) => {
    const contact = await User.findOne({ username: newContactUsername });

    if (contact === null) {
        throw new Error("User not found");
    }

    const chat = await Chat.findOne({
        $and: [
            { users : { $size : 2 }},
            { users: { $elemMatch: { username: username } } },
            { users: { $elemMatch: { username: newContactUsername } } },
        ],
    });

    if (chat !== null) {
        throw new Error("Chat already exists");
    }

    const user = await User.findOne({ username: username });
    const newChat = new Chat({ users: [user, contact], messages: [] });
    await newChat.save();
};

const getChat = async (id) => {
    const chat = await Chat.findById(id);

    if (chat === null) {
        throw new Error("Chat not found");
    }

    return chat;
};

const deleteChat = async (id) => {
    const chat = await Chat.findByIdAndDelete(id);

    if (chat === null) {
        throw new Error("Chat not found");
    }

    return chat;
};

const addChatMessage = async (id, message) => {
    const chat = await Chat.findById(id);

    if (chat === null) {
        throw new Error("Chat not found");
    }

    const msg = new Message({
        created: Date.now().toString,
        sender: getCurrentUser(),
        content: message,
    });

    msg.save();

    chat.messages.push(msg);

    await chat.save();
};

const getChatMessages = async (id) => {
    const chat = await Chat.findById(id);

    if (chat === null) {
        throw new Error("Chat not found");
    }

    return chat.messages;
};

module.exports = {
    getChats,
    createChat,
    getChat,
    deleteChat,
    addChatMessage,
    getChatMessage: getChatMessages
};
