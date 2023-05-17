import React from "react";
import TypingArea from "./TypingArea/TypingArea";
import MessageBoard from "./MessageBoard/MessageBoard";
import RecipientDetails from "./RecipientDetails/RecipientDetails";

function ChatArea({contacts, userDetails, messages}) {
    return (
        <div className="col-8 p-0">
            <div className="card border-0">
                <RecipientDetails />           
                <MessageBoard />
                <TypingArea />
            </div>
        </div>
    );
}

export default ChatArea;
