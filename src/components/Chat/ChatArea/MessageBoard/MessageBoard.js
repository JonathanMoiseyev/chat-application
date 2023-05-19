import { useRef, useEffect, Component } from "react";
import Message from "./Message";
import chatsDB from "../../../../db/chatsDB";

function MessageBoard({ user, chosenContact }) {
    let messageComponents = [];

    if (chosenContact != null) {
        const messages = chatsDB[user.username][chosenContact];
        messageComponents = messages.map((message, key) => (
            <Message user={user} message={message} key={key} />
        ));
    }

    return (
        <div className="card-body p-0">
            <ul
                className="list-unstyled overflow-auto m-0 pt-2"
                id="chat"
            >
                {messageComponents}
            </ul>
        </div>
    );
}

export default MessageBoard;
