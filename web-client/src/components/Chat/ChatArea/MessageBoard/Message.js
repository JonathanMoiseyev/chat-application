/** @format */

// import { dateToString } from "../../../shared/dateToString.js";
import { getReformattedDate } from "../../../shared/userApi";

function Message({ user, message }) {
    let alignmentStyle = "",
        messageStyle = "bg-light-gray";

    if (message.sender.username === user.username) {
        alignmentStyle = "justify-content-end";
        messageStyle = "bg-light-purple text-white";
    }

    return (
        <>
            <li className={`d-flex ${alignmentStyle}`}>
                <div className={`card rounded-4 max-width-60 mx-3 my-2 ${messageStyle}`}>
                    <div className="card-body py-2 px-3">{message.content}</div>
                </div>
            </li>
            <li className={`d-flex ${alignmentStyle}`}>
                <small className="mx-4 text-muted">{getReformattedDate(message.created)}</small>
            </li>
        </>
    );
}

export default Message;
