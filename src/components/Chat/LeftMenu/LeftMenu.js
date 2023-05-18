import {useState} from "react";
import ContactList from "./ContactList/ContactList.js";
import SearchBar from "./SearchBar/SearchBar.js";
import UserOptions from "./UserOptions/UserOptions.js";

import usersDB from "../../../db/usersDB.js";

function LeftMenu({user, setChosenContact}) {

    const userContacts = usersDB[user].contacts.map((contact) => usersDB[contact]);
    const [effectiveContacts, setEffectiveContacts] = useState(userContacts);

    const doSearch = function(query) {
        setEffectiveContacts(
            userContacts.filter((contact) =>
                query === undefined
                    ? true
                    : contact.displayName.toLowerCase().includes(query.toLowerCase())
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
