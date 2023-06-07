/** @format */

import React from "react";
import { useState } from "react";
import TypingArea from "./TypingArea/TypingArea";
import MessageBoard from "./MessageBoard/MessageBoard";
import RecipientDetails from "./RecipientDetails/RecipientDetails";

function ChatArea({ user, setUser, chosenContact, status, forceRerender, socket }) {
    const [chat, setChat] = useState([]);

    return (
        <div className="col-8 p-0">
            <div className="card border-0">
                <RecipientDetails chosenContact={chosenContact} />
                <MessageBoard
                    user={user}
                    chosenContact={chosenContact}
                    chat={chat}
                    setChat={setChat}
                    status={status}
                />
                <TypingArea
                    user={user}
                    setUser={setUser}
                    chosenContact={chosenContact}
                    setChat={setChat}
                    chat={chat}
                    socket={socket}
                    status={status}
                    forceRerender={forceRerender}
                />
            </div>
        </div>
    );
}

export default ChatArea;
