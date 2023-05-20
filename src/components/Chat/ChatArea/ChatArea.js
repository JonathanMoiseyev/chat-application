import React from "react";
import TypingArea from "./TypingArea/TypingArea";
import MessageBoard from "./MessageBoard/MessageBoard";
import RecipientDetails from "./RecipientDetails/RecipientDetails";

function ChatArea({ user, chosenContact, forceUpdate, status }) {
    return (
        <div className="col-8 p-0">
            <div className="card border-0">
                <RecipientDetails chosenContact={chosenContact} />
                <MessageBoard user={user} chosenContact={chosenContact} />
                <TypingArea
                    user={user}
                    chosenContact={chosenContact}
                    forceUpdate={forceUpdate}
                    status={status}
                />
            </div>
        </div>
    );
}

export default ChatArea;
