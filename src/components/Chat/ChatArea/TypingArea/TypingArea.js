import React from "react";
import chatsDB from "../../../../db/chatsDB";

function TypingArea({user, chosenContact, forceUpdate, status}) {
    if (chosenContact == null) return (<></>);

    const writeMessage = (event) => {
        if (event.key === "Enter" && event.target.value.length > 0) {
            const message = {
                content: event.target.value,
                sender: user.username,
                date: (new Date()).getDate()
            }

            event.target.value = "";

            chatsDB[user.username][chosenContact].push(message);
            chatsDB[chosenContact][user.username].push(message);

            forceUpdate(!status); 
        }
    }

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
