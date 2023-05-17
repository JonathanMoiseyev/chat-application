import React from "react";
import Contact from "./Contact.js";
import contacts from "./contacs.js";

function ContactList(props) {
    const contactList = contacts.map((contact) => <Contact {...contact}/>);

    return (
        <div className="card-body p-0">
            <ul className="list-group list-group-flush overflow-auto" id="contact-list">
                {contactList}
            </ul>
        </div>
    );
}

export default ContactList;
