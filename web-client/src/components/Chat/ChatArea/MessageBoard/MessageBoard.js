/** @format */

import { useEffect, useState } from "react";
import Message from "./Message";
import { fetchMessages } from "../../../shared/api";

function MessageBoard({ user, chosenContact, chat, setChat, status }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (chosenContact != null) {
            fetchMessages(user.token, chosenContact.id).then((newChat) => {
                if (chat === null) {
                    alert("Error fetching messages");
                    return;
                }

                setChat(newChat.messages);
            });
        }
    }, [status]);

    useEffect(() => {
        if (chosenContact != null) {
            if (chat == null) return;
            let messageComponents = chat.map((message, key) => <Message user={user} message={message} />);
            setMessages(messageComponents);
        }
    }, [chat]);

    return (
        <div className="card-body p-0">
            <ul className="list-unstyled overflow-auto m-0 pt-2" id="chat">
                {messages}
            </ul>
        </div>
    );
}

export default MessageBoard;
