import { useState } from "react";
import ContactList from "./ContactList/ContactList.js";
import SearchBar from "./SearchBar/SearchBar.js";
import UserOptions from "./UserOptions/UserOptions.js";
import usersDB from "../../../db/usersDB.js";

function LeftMenu({ user, setUser, setChosenContact }) {
    let userContacts = user.contacts.map((contact) => usersDB[contact]);
    const [effectiveContacts, setEffectiveContacts] = useState(userContacts);
    const [searchValue, setSearchValue] = useState(undefined);

    const doSearch = function (query) {
        setSearchValue(query);

        if (query === undefined) {
            setEffectiveContacts(userContacts);
        } else {
            setEffectiveContacts(
                userContacts.filter((contact) =>
                    contact.displayName.toLowerCase().includes(query.toLowerCase())
                )
            );
        }
    };

    const refreshContacts = function (contact) {
        userContacts = user.contacts.map((contact) => usersDB[contact]);
        doSearch(searchValue);
    };

    return (
        <div className="col-4 p-0 border-end">
            <div className="card border-0">
                <UserOptions
                    user={user}
                    setUser={setUser}
                    refreshContacts={refreshContacts}
                />
                <SearchBar doSearch={doSearch} />
                <ContactList
                    user={user}
                    contacts={effectiveContacts}
                    setChosenContact={setChosenContact}
                />
            </div>
        </div>
    );
}

export default LeftMenu;
