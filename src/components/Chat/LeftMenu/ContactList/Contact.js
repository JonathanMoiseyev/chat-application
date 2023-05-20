import { React, useRef } from "react";

function Contact({ contact, setChosenContact }) {
    const contactRef = useRef(null);

    const pickConversation = function () {
        // Darken the chosen contact
        contactRef.current.style.filter = "brightness(90%)";

        // Remove the darkening from other contacts
        Array.from(contactRef.current.parentElement.children).forEach((contact) => {
            if (contact !== contactRef.current) contact.style.filter = "";
        });

        // Update what conversation is being displayed
        setChosenContact(contact.username);
    };

    return (
        <li
            className="list-group-item d-flex align-items-center mx-0 darken-on-hover"
            onClick={pickConversation}
            ref={contactRef}
        >
            <div>
                <img src={contact.img} className="rounded-circle" alt="avatar" />
            </div>
            <div className="w-100 ms-4">
                <div>{contact.displayName}</div>
                <small className="text-muted">{}</small>
            </div>
            <div>
                <small className="text-muted me-2">{}</small>
                <span className="badge bg-light-purple rounded-pill float-end me-2">
                    14
                </span>
            </div>
        </li>
    );
}

export default Contact;
