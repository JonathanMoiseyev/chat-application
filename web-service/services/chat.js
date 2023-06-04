const Chat = require('../models/chat');
const Message = require('../models/Message');

const getChats = async () => {
//
}

const getChat = async (id) => {
    const chat = await Chat.find({ id : id });

    if (chat == null) {
        throw new Error('Chat not found');
    }
    else {
        return chat;
    }
}


const deleteChat = async (id) => {
    await Chat.deleteById({ id : id });
}


const addChatMessage = async (id, messageStr) => {
    const chat = Chat.find({ id : id });
    const msg = await Message.save({ created : Date.now().toString, sender : getCurrentUser(), content : messageStr });



    chat.messages.push(msg);
}
