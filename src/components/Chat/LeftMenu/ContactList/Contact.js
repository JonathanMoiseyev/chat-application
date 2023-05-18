import {React, useRef} from "react";


function Contact({ img, name, lastMessage, date, setConv }) {
    const contactRef = useRef(null);

    const pickConversation = function () {
        // Darken the chosen contact
        contactRef.current.style.filter = "brightness(90%)";

        // Remove the darkening from other contacts
        const contacts = contactRef.current.parentElement.children;

        for (let i = 0; i < contacts.length; i++) {
            if (contacts[i] !== contactRef.current) {
                contacts[i].style.filter = "brightness(100%)";
            }
        }

        // Update what conversation is being displayed 
        setConv({ name, img });
    };

    return (
        <li
            className="list-group-item d-flex align-items-center mx-0 darken-on-hover"
            onClick={pickConversation}
            ref={contactRef}
        >
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
