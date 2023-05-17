import React from "react";

function Contact(props) {
    return (
        <li className="list-group-item d-flex align-items-center mx-0 darken-on-hover">
            <div>
                <img src={props.img} className="rounded-circle" alt="avatar" />
            </div>
            <div className="w-100 ms-4">
                <div>{props.name}</div>
                <small className="text-muted">{props.lastMessage}</small>
            </div>
            <div>
                <small className="text-muted me-2">{props.date}</small>
                <span className="badge bg-light-purple rounded-pill float-end me-2">
                    14
                </span>
            </div>
        </li>
    );
}

export default Contact;
