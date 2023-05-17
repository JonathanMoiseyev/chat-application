import React from "react";
import "./Chat.css";
import LeftMenu from "./LeftMenu/LeftMenu";
import ChatArea from "./ChatArea/ChatArea";

function Chat({contacts, userDetails, messages}) {
    return (
        <main className="container shadow mt-4" id="chat-app">
            <div className="row">
                <LeftMenu contacts={contacts} userDetails={userDetails} messages={messages} />
                <ChatArea contacts={contacts} userDetails={userDetails} messages={messages} />
            </div>
        </main>
    );
}

export default Chat;
