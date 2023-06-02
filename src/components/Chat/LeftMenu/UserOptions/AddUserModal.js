/** @format */

import React from "react";
import { useState } from "react";
import InputField from "./../../../shared/InputField";
import { postContact } from "../../../shared/api";
import { createContact, addContact } from "../../../shared/userApi";

function AddUserModal({ user, refreshContacts }) {
    let [inputUsername, setInputUsername] = useState("");
    let [errorMessage, setErrorMessage] = useState("");

    const addNewContact = async (user, username) => {
        let res = await postContact(user.token, inputUsername);
        if (res === "User not found") {
            setErrorMessage(res);
        } else {
            let contact = createContact(res.user, res.id);
            addContact(user, contact);
            // addContact(user, createContact(await fetchUser(user.token, inputUsername)));
            setErrorMessage("");
            refreshContacts();
        }
    };

    const onFormSubmition = (event) => {
        event.preventDefault();
        addNewContact(user);
    };

    return (
        <div className="modal fade" id="new-chat">
            <div className="modal-dialog">
                <div className="modal-content p-3">
                    {/* Title and X button */}
                    <div className="modal-header border-0">
                        <h1 className="modal-title fs-5">Add new contact</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    {/* Input */}
                    <div className="modal-body">
                        <form onSubmit={onFormSubmition}>
                            <InputField
                                labelOfInputField="Username"
                                idOfInputField="username"
                                updateFunction={setInputUsername}
                                inputType="text"
                            />
                        </form>
                    </div>

                    {/* Error message */}
                    <span>{errorMessage}</span>
                </div>
            </div>
        </div>
    );
}

export default AddUserModal;
