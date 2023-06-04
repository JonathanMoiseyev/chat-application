/** @format */

import { React, useRef } from "react";
import { getReformattedDate } from "../../../shared/userApi.js";

function Contact({ user, contact, setChosenContact, status, foreRerender }) {
    const contactRef = useRef(null);

    // TODO: update last message
    const lastMessage = contact.lastMessage;
    let lastMessageDate = null,
        lastMessageContent = "";

    if (lastMessage !== null) {
        lastMessageDate = lastMessage.created;
        lastMessageContent = lastMessage.content;
    }

    const pickConversation = function () {
        // Darken the chosen contact
        contactRef.current.style.filter = "brightness(90%)";

        // Remove the darkening from other contacts
        Array.from(contactRef.current.parentElement.children).forEach((contact) => {
            if (contact !== contactRef.current) contact.style.filter = "";
        });

        // Update what conversation is being displayed
        setChosenContact(contact);
        foreRerender(!status);
    };

    return (
        <li
            className="list-group-item d-flex align-items-center mx-0 darken-on-hover"
            onClick={pickConversation}
            ref={contactRef}
        >
            <div>
                <img src={contact.user.profilePic} className="rounded-circle profile-picture" alt="avatar" />
            </div>
            <div className="w-100 ms-4">
                <div>
                    <span className="d-inline-block text-truncate" style={{ maxWidth: 200 }}>
                        {contact.user.displayName}
                    </span>
                </div>
                <small className="d-inline-block text-muted text-truncate" style={{ maxWidth: 200 }}>
                    {lastMessageContent}
                </small>
            </div>
            <div>
                <small className="text-muted me-2">{getReformattedDate(lastMessageDate)}</small>
                {/* <span className="badge bg-light-purple rounded-pill float-end me-2">
                    14
                </span> */}
            </div>
        </li>
    );
}

export default Contact;
