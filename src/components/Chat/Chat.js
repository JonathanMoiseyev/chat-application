import { useState } from "react";
import "./Chat.css";
import LeftMenu from "./LeftMenu/LeftMenu";
import ChatArea from "./ChatArea/ChatArea";

function Chat({ user }) {
    const [chosenContact, setChosenContact] = useState("");

    return (
        <main className="container shadow mt-4" id="chat-app">
            <div className="row">
                <LeftMenu user={user} setChosenContact={setChosenContact} />
                <ChatArea user={user} chosenContact={chosenContact} />
            </div>
        </main>
    );
}

export default Chat;
