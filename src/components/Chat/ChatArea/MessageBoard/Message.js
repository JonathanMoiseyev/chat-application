import React from "react";

function Message({ content, type, date }) {
    const msgAlign = type === "sent" ? " justify-content-end" : "";
    const msgColor = type === "sent" ? "bg-light-pruple text-white" : "bg-light-gray";

    <li className={"d-flex" + msgAlign}>
        <div className={"card rounded-4 max-width-60 mx-3 my-2 bg-light-purple" + msgColor}>
            <div className="card-body">{content}</div>
        </div>
    </li>;
}

export default Message;
