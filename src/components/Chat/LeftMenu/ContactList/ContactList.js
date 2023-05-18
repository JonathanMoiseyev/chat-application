import React from "react";
import Contact from "./Contact.js";

function ContactList({ contacts, setChosenContact }) {
    const contactComponents = contacts.map((contact, key) => (
        <Contact contact={contact} setChosenContact={setChosenContact} key={key} />
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
