/** @format */

import React from "react";
import Contact from "./Contact.js";

function ContactList({ user, contacts, setChosenContact, status, forceRerender }) {
    const contactComponents = contacts.map((contact, key) => (
        <Contact
            user={user}
            contact={contact}
            setChosenContact={setChosenContact}
            status={status}
            forceRerender={forceRerender}
            key={key}
        />
    ));

    return (
        <div className="card-body p-0">
            <ul className="list-group list-group-flush overflow-auto" id="contact-list">
                {contactComponents}
            </ul>
        </div>
    );
}

export default ContactList;
