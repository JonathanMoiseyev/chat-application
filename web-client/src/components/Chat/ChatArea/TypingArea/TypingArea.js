/** @format */

import React from "react";
// import chatsDB from "../../../../db/chatsDB";
import { postMessage } from "../../../shared/api";
import { addMessage } from "../../../shared/userApi";

function TypingArea({ user, chosenContact, chat, setChat, socket }) {
    if (chosenContact == null) return <></>;

    const writeMessage = (event) => {
        if (event.key === "Enter" && event.target.value.length > 0) {
            let message = event.target.value;
            event.target.value = "";

            postMessage(user.token, chosenContact.id, message, socket, chosenContact.username ).then((newMessage) => {
                if (newMessage === null) {
                    alert("Error sending message");
                    return;
                }

                let newChat = JSON.parse(JSON.stringify(chat));
                addMessage(newChat, newMessage);
                setChat(newChat);
            });
        }
    };

    return (
        <div className="card-footer input-group bg-light-gray rounded-0">
            <input
                type="text"
                className="form-control rounded-pill"
                placeholder="Type a message"
                onKeyUp={(event) => writeMessage(event)}
            />
        </div>
    );
}

export default TypingArea;
