import React, { useEffect } from "react";
import "./Chat.css";
import LeftMenu from "./LeftMenu/LeftMenu";
import ChatArea from "./ChatArea/ChatArea";

import userDetails from "../../db/userDetails";
import contacts from "../../db/contacs";
import messages from "../../db/messages";

function Chat() {
    const [conversation, setConversation] = React.useState("");

    return (
        <main className="container shadow mt-4" id="chat-app">
            <div className="row">
                <LeftMenu
                    contacts={contacts}
                    userDetails={userDetails}
                    messages={messages}
                    setConv={setConversation}
                />
                <ChatArea conversation={conversation} messages={messages}/>
            </div>
        </main>
    );
}

export default Chat;
