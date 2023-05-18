import {useRef, useEffect} from "react";
import chatsDB from "../../../../db/chatsDB";

function MessageBoard({user, chosenContact}) {
    const chatRef = useRef(null);

    useEffect(() => {
        if (chosenContact != null) {
            const messages = chatsDB[user.username][chosenContact];
            // const messagesComponents = messages.map((message, key) => <Message {...message} key={key} />);
        }
    });

    return (
        <div className="card-body p-0">
            <ul className="list-unstyled overflow-auto m-0 pt-2" id="chat" ref={chatRef}></ul>
        </div>
    );
}

export default MessageBoard;
