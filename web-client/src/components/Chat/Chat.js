/** @format */

import { useState } from "react";
import { io } from "socket.io-client"
import LeftMenu from "./LeftMenu/LeftMenu";
import ChatArea from "./ChatArea/ChatArea";
import "./Chat.css";

// import { getDefaultContact } from "../shared/userApi";

function Chat({ user, setUser }) {
    const [status, forceRerender] = useState(false);
    const [chosenContact, setChosenContact] = useState(null);
    


    const socket = io("ws://localhost:5555", { transports: ["websocket"] });

    socket.on(user.username, function(msg) {
        user.contacts.forEach((contact) => {
            if (contact.user.username === msg.sender.username) {
                contact.lastMessage = msg.msg;
                forceRerender(!status);
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
                    forceRerender={forceRerender}
                />
                <ChatArea 
                    user={user}
                    setUser={setUser}
                    chosenContact={chosenContact}
                    forceRerender={forceRerender}
                    status={status}
                    socket={socket}
                />
            </div>
        </main>
    );
}

export default Chat;
