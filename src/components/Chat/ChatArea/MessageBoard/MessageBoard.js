import Message from "./Message";
import chatsDB from "../../../../db/chatsDB";

function MessageBoard({ user, chosenContact }) {
    let messageComponents = [];

    if (chosenContact != null) {
        const messages = chatsDB[user.username][chosenContact];

        messageComponents = messages.map((message, key) => (
            <Message key={key} user={user} message={message} />
        ));
    }

    return (
        <div className="card-body p-0">
            <ul className="list-unstyled overflow-auto m-0 pt-2" id="chat">
                {messageComponents}
            </ul>
        </div>
    );
}

export default MessageBoard;
