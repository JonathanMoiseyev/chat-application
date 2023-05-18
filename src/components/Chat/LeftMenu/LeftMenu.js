import {useState} from "react";
import ContactList from "./ContactList/ContactList.js";
import SearchBar from "./SearchBar/SearchBar.js";
import UserOptions from "./UserOptions/UserOptions.js";

import contactsDB from "../../../db/contacsDB.js";

function LeftMenu({user, setChosenContact}) {
    const userContacts = contactsDB[user];
    const [effectiveContacts, setEffectiveContacts] = useState(userContacts);

    const doSearch = function(query) {
        setEffectiveContacts(
            userContacts.filter((contact) =>
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
                <ContactList contacts={effectiveContacts} setChosenContact={setChosenContact} />
            </div>
        </div>
    );
}

export default LeftMenu;
