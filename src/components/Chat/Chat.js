/** @format */

import { useState } from "react";
import LeftMenu from "./LeftMenu/LeftMenu";
import ChatArea from "./ChatArea/ChatArea";
import "./Chat.css";
// import { getDefaultContact } from "../shared/userApi";

function Chat({ user, setUser }) {
    const [status, foreRerender] = useState(false);
    const [chosenContact, setChosenContact] = useState(null);

    return (
        <main className="container shadow mt-4" id="chat-app">
            <div className="row">
                <LeftMenu
                    user={user}
                    setUser={setUser}
                    setChosenContact={setChosenContact}
                    status={status}
                    foreRerender={foreRerender}
                />
                <ChatArea user={user} chosenContact={chosenContact} foreRerender={foreRerender} status={status} />
            </div>
        </main>
    );
}

export default Chat;
