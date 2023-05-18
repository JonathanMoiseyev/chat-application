import React from "react";
import ContactList from "./ContactList/ContactList.js";
import SearchBar from "./SearchBar/SearchBar.js";
import UserOptions from "./UserOptions/UserOptions.js";

function LeftMenu({contacts, userDetails, messages, setConv}) {
    const [effectiveContacts, setEffectiveContacts] = React.useState(contacts);

    const doSearch = function (query) {
        setEffectiveContacts(
            contacts.filter((contact) =>
                query === undefined
                    ? true
                    : contact.name.toLowerCase().includes(query.toLowerCase())
            )
        );
    };

    return (
        <div className="col-4 p-0 border-end">
            <div className="card border-0">
                <UserOptions />
                <SearchBar doSearch={doSearch} />
                <ContactList contacts={effectiveContacts} setConv={setConv} />
            </div>
        </div>
    );
}

export default LeftMenu;
