import React from "react";

function Contact({img, name, lastMessage, date}) {
    return (
        <li className="list-group-item d-flex align-items-center mx-0 darken-on-hover">
            <div>
                <img src={img} className="rounded-circle" alt="avatar" />
            </div>
            <div className="w-100 ms-4">
                <div>{name}</div>
                <small className="text-muted">{lastMessage}</small>
            </div>
            <div>
                <small className="text-muted me-2">{date}</small>
                <span className="badge bg-light-purple rounded-pill float-end me-2">
                    14
                </span>
            </div>
        </li>
    );
}

export default Contact;
