const Chat = require("../models/chat");
const User = require("../models/user");
const Message = require("../models/Message");

const getChats = async (username) => {
    const chats = await Chat.find((chat) =>
        chat.users.some((user) => user.username == username)
    );

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

    const user = await User.findOne({ username });

    // Check if chat already exists
    const chat = await Chat.findOne({users : [user, contact]});

    if (chat !== null) {
        throw new Error("Chat already exists");
    }

    // Create chat

}

const getChat = async (id) => {
    const chat = await Chat.findOneById(id);

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

const getChatMessage = async (id, message) => {
    const chat = await Chat.findOneById(id);

    if (chat === null) {
        throw new Error("Chat not found");
    }

    return chat.messages;
};

const addChatMessage = async (id, message) => {
    const chat = await Chat.find({ id });

    const msg = await Message.save({
        created: Date.now().toString,
        sender: getCurrentUser(),
        content: messageStr,
    });

    chat.messages.push(msg);
};
