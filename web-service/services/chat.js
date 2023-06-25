const Chat = require("../models/chat");
const User = require("../models/user");
const Message = require("../models/message");
const firebaseKey = require("../firebaseKey.json");
const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(firebaseKey)
});

const sendMsgToAndroid = (fcm_token, title, body, data) => {
    admin.messaging().send({
        notification: {
            title: title,
            body: body
        },
        data: data,
        token: fcm_token
    });

    console.log('here again')
}

const io = require("socket.io")();




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


    if (contact.androidToken === "" || contact.androidToken == null) {
        // send via socket io
        io.emit(
            JSON.stringify({ type: "new contact", receiverUserName: contact.username }),
            {sender: user, chatId: newChat._id.toString()});
    }
    else {
        // send notification through firebase
        sendMsgToAndroid(contact.androidToken, "new chat", contact.displayName + " added you to a new chat",
                {"sender": JSON.stringify(user), "chatId": newChat._id.toString(), "type": "new contact"});
    }




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

    chat.users.forEach(async (user) => {
        if (user != null && user.username !== username) {
            const reciver = await User.findOne({ username: user.username });
            if (reciver.androidToken === "" || reciver.androidToken == null) {
                // send via socket io
                io.emit(reciver.username, {msg: msg, sender: msg.sender, reciverUserName: reciver.username});
            }

            else {
                // send notification through firebase
                sendMsgToAndroid(reciver.androidToken, msg.sender.displayName + ":", msg.content, 
                            {"sender": JSON.stringify(msg.sender), "chatId": chatId, "type": "new message"});
            }
        }
    });



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
    getChatMessages,
    getChatMessage: getChatMessages
};
