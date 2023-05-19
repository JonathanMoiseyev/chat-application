function Message({ user, message }) {
    let alignmentStyle = "",
        messageStyle = "bg-light-gray";

    if (message.sender === user.username) {
        alignmentStyle = "justify-content-end";
        messageStyle = "bg-light-purple text-white";
    }

    return (
        <>
            <li className={`d-flex ${alignmentStyle}`}>
                <div className={`card rounded-4 max-width-60 mx-3 my-2 ${messageStyle}`}>
                    <div className="card-body">{message.content}</div>
                </div>
            </li>
        </>
    );
}

export default Message;
