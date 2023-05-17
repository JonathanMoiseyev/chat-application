import React from "react";
import "./Chat.css";
import LeftMenu from "./LeftMenu/LeftMenu";
import ChatArea from "./ChatArea/ChatArea";

function Chat(props) {
    return (
        <main className="container shadow mt-4" id="chat-app">
            <div className="row">
                <LeftMenu {...props} />
                <ChatArea {...props} />
            </div>
        </main>
    );
}

export default Chat;
