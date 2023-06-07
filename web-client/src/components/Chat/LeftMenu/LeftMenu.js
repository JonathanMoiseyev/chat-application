/** @format */

import { useState, useEffect } from "react";
import ContactList from "./ContactList/ContactList.js";
import SearchBar from "./SearchBar/SearchBar.js";
import UserOptions from "./UserOptions/UserOptions.js";

import "../Chat.css";

import { getContacts } from "../../shared/userApi.js";

function LeftMenu({ user, setUser, setChosenContact, status, forceRerender }) {
    let userContacts = getContacts(user);
    const [effectiveContacts, setEffectiveContacts] = useState(JSON.parse(JSON.stringify(userContacts)));
    const [searchValue, setSearchValue] = useState(undefined);

    const doSearch = function (query) {
        setSearchValue(query);

        if (query === undefined) {
            setEffectiveContacts(JSON.parse(JSON.stringify(userContacts)));
        } else {
            setEffectiveContacts(
                userContacts.filter((contact) => contact.user.displayName.toLowerCase().includes(query.toLowerCase()))
            );
        }
    };

    const refreshContacts = () => {
        doSearch(searchValue);
    };

    useEffect(() => {
        refreshContacts();
    }, [status]);

    return (
        <div className="col-4 p-0 border-end">
            <div className="card border-0">
                <UserOptions user={user} setUser={setUser} refreshContacts={refreshContacts} />
                <SearchBar doSearch={doSearch} />
                <ContactList
                    user={user}
                    contacts={effectiveContacts}
                    setChosenContact={setChosenContact}
                    status={status}
                    forceRerender={forceRerender}
                />
            </div>
        </div>
    );
}

export default LeftMenu;
