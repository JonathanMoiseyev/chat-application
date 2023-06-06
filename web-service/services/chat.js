const Chat = require("../models/chat");
const User = require("../models/user");
const Message = require("../models/message");

const getChats = async (username) => {
    const chats = await Chat.find({ users: { $elemMatch: { username: username } } });

    const res = [];

    for (const chat of chats) {
        const contact = chat.users.find((user) => user.username !== username);
        const lastMessage =
            chat.messages.length == 0 ? null : chat.messages[chat.messages.length - 1];

        res.push({
            id: chat._id,
            user: contact,
            lastMessage: lastMessage,
        });
    }

    return res;
};

const createChat = async (username, newContactUsername) => {
    if (username === newContactUsername) {
        throw new Error("You can't chat with yourself");
    }

    const contact = await User.findOne({ username: newContactUsername });

    if (contact === null) {
        throw new Error("User not found");
    }

    const chat = await Chat.findOne({
        $and: [
            { users: { $size: 2 } },
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

    return {
        id: newChat._id,
        user: {
            username: contact.username,
            displayName: contact.displayName,
            profilePic: contact.profilePic,
        },
    };
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

const addChatMessage = async (chatId, username, message) => {
    const chat = await Chat.findById(chatId);

    if (chat === null) {
        throw new Error("Chat not found");
    }

    const msg = new Message({
        sender: chat.users.find((user) => user.username === username),
        content: message,
    });

    await msg.save();
    chat.messages.push(msg);
    await chat.save();

    return msg;
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
    getChatMessage: getChatMessages,
};
