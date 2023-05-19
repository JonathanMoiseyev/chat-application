import { useState } from "react";
import "./Chat.css";
import LeftMenu from "./LeftMenu/LeftMenu";
import ChatArea from "./ChatArea/ChatArea";

function Chat({ user, setUser }) {
    const [status, forceUpdate] = useState(false);
    const [chosenContact, setChosenContact] = useState(null);

    return (
        <main className="container shadow mt-4" id="chat-app">
            <div className="row">
                <LeftMenu
                    user={user}
                    setUser={setUser}
                    setChosenContact={setChosenContact}
                />
                <ChatArea
                    user={user}
                    chosenContact={chosenContact}
                    forceUpdate={forceUpdate}
                    status={status}
                />
            </div>
        </main>
    );
}

export default Chat;
