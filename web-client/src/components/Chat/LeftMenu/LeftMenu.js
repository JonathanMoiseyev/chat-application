/** @format */

import { useState, useEffect, useCallback } from "react";
import ContactList from "./ContactList/ContactList.js";
import SearchBar from "./SearchBar/SearchBar.js";
import UserOptions from "./UserOptions/UserOptions.js";

import "../Chat.css";

import { getContacts, createContact, addContact } from "../../shared/userApi.js";

function LeftMenu({ user, setUser, setChosenContact, status, forceRerender, socket }) {

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
        //userContacts = getContacts(user);
        doSearch(searchValue);
    };


    socket.on(JSON.stringify({ type: "new contact", receiverUserName: user.username }), (webMessage) => {
        
        // checking if the contact already exists
        if (user.contacts.some((contact) => contact.user.username === webMessage.sender.username)) {
            return;
        }
        
        let contact = createContact(webMessage.sender, webMessage.chatId);
        addContact(user, contact);
        refreshContacts();
        
    });


    

    const doSearchUseCallBack = useCallback((query) => {
        setSearchValue(query);

        if (query === undefined) {
            setEffectiveContacts(JSON.parse(JSON.stringify(userContacts)));
        } else {
            setEffectiveContacts(
                userContacts.filter((contact) => contact.user.displayName.toLowerCase().includes(query.toLowerCase()))
            );
        }
    }, [userContacts]);

    const refreshContactsUseCallBack = useCallback(() => {
        doSearchUseCallBack(searchValue);
    }, [doSearchUseCallBack, searchValue]);

    useEffect(() => {
        refreshContactsUseCallBack();
    }, [status, refreshContactsUseCallBack]);

    

    return (
        <div className="col-4 p-0 border-end">
            <div className="card border-0">
                <UserOptions user={user} setUser={setUser} refreshContacts={refreshContacts} socket={socket} />
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
