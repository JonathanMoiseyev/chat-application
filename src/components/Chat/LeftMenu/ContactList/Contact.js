import {React, useRef} from "react";
import usersDB from "../../../../db/usersDB";

function Contact({ contact, setChosenContact }) {
    const contactRef = useRef(null);

    const pickConversation = function () {
        // Darken the chosen contact
        contactRef.current.style.filter = "brightness(90%)";

        // Remove the darkening from other contacts
        const otherContactsRefs = contactRef.current.parentElement.children;

        for (let i = 0; i < otherContactsRefs.length; i++) {
            if (otherContactsRefs[i] !== contactRef.current) {
                otherContactsRefs[i].style.filter = "brightness(100%)";
            }
        }

        // Update what conversation is being displayed 
        setChosenContact(contact);
    };

    const contactDetails = usersDB[contact];

    return (
        <li
            className="list-group-item d-flex align-items-center mx-0 darken-on-hover"
            onClick={pickConversation}
            ref={contactRef}
        >
            <div>
                <img src={contactDetails.img} className="rounded-circle" alt="avatar" />
            </div>
            <div className="w-100 ms-4">
                <div>{contactDetails.img}</div>
                <small className="text-muted">{}</small>
            </div>
            <div>
                <small className="text-muted me-2">{contactDetails.img}</small>
                <span className="badge bg-light-purple rounded-pill float-end me-2">
                    14
                </span>
            </div>
        </li>
    );
}

export default Contact;
