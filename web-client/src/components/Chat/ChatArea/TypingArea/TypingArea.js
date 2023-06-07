/** @format */

import React from "react";
// import chatsDB from "../../../../db/chatsDB";
import { postMessage } from "../../../shared/api";
import { addMessage } from "../../../shared/userApi";

function TypingArea({ user, chosenContact, chat, setChat, socket, status, forceRerender, setUser }) {
    if (chosenContact == null) return <></>;

    const writeMessage = async (event) => {
        if (event.key === "Enter" && event.target.value.length > 0) {
            let message = event.target.value;
            event.target.value = "";
            await postMessage(user.token, chosenContact.id, message, socket, user, chosenContact.user.username).then(
                (newMessage) => {
                    if (newMessage === null) {
                        alert("Error sending message");
                        return;
                    }

                    let newChat = JSON.parse(JSON.stringify(chat));
                    addMessage(newChat, newMessage);
                    setChat(newChat);

                    console.log("הגיע", newMessage);

                    let tempUser = JSON.parse(JSON.stringify(user));
                    tempUser.contacts.forEach((contact) => {
                        if (contact.user.username === chosenContact.user.username) {
                            contact.lastMessage = newMessage;
                            forceRerender(!status);
                        }
                    });
                    setUser(tempUser);

                    forceRerender(!status);
                }
            );
        }
    };

    return (
        <div className="card-footer input-group bg-light-gray rounded-0">
            <input
                type="text"
                className="form-control rounded-pill"
                placeholder="Type a message"
                onKeyUp={async (event) => await writeMessage(event)}
            />
        </div>
    );
}

export default TypingArea;
