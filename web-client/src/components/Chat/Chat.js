/** @format */

import { useState } from "react";
import io from "socket.io-client"
import LeftMenu from "./LeftMenu/LeftMenu";
import ChatArea from "./ChatArea/ChatArea";
import "./Chat.css";

// import { getDefaultContact } from "../shared/userApi";

function Chat({ user, setUser }) {
    const [status, foreRerender] = useState(false);
    const [chosenContact, setChosenContact] = useState(null);
    
    var socket = io();
    socket.on(user.username, function(msg) {
        user.contacts.forEach((contact) => {
            if (contact.username === msg.sender.username) {
                contact.lastMessage = msg.content;
                foreRerender(!status);
            }
        });
    });
    
    return (
        <main className="container shadow mt-4" id="chat-app">
            <div className="row">
                <LeftMenu
                    user={user}
                    setUser={setUser}
                    setChosenContact={setChosenContact}
                    status={status}
                    foreRerender={foreRerender}
                />
                <ChatArea 
                    user={user}
                    chosenContact={chosenContact}
                    foreRerender={foreRerender}
                    status={status}
                    socket={socket}
                />
            </div>
        </main>
    );
}

export default Chat;
