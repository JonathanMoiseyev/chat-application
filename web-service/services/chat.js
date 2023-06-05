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

    const user = await User.findOne({ username });

    // Check if chat already exists
    if (
        (await Chat.findOne({ users: [contact, user] })) ||
        (await Chat.findOne({ users: [user, contact] }))
    ) {
        throw new Error("Chat already exists");
    }

    // Create chat
    Chat.save(await Chat.create({ users: [contcat, user], messages: [] }));
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

    const msg = await Message.save({
        created: Date.now().toString,
        sender: getCurrentUser(),
        content: message,
    });

    chat.messages.push(msg);
};

const getChatMessage = async (id, message) => {
    const chat = await Chat.findById(id);

    if (chat === null) {
        throw new Error("Chat not found");
    }

    return chat.messages;
};
