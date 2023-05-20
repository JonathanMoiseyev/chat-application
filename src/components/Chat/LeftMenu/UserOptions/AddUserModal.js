import React from "react";
import { useState } from "react";
import InputField from "./../../../shared/InputField";
import chatsDB from "../../../../db/chatsDB.js";
import usersDB from "../../../../db/usersDB.js";

function AddUserModal({username, refreshContacts }) {
    let [inputUsername, setInputUsername] = useState("")
    let [errorMessage, setErrorMessage] = useState("")

    const addNewContact = (username) => {
        if (usersDB[inputUsername] == undefined) {
            setErrorMessage("User does not exist!")
        }
        else if (chatsDB[username][inputUsername] != undefined) {
            setErrorMessage("You already have this contact!")
        }
        else {
            chatsDB[username][inputUsername] = []
            chatsDB[inputUsername][username] = []
            usersDB[username].contacts.push(inputUsername)
            usersDB[inputUsername].contacts.push(username)

            refreshContacts()
        }
    }


    const onFormSubmition = (event) => {
        event.preventDefault();
        addNewContact(username);
    }



    
    return (
        <div className="modal fade" id="new-chat">
            <div className="modal-dialog">
                <div className="modal-content p-3">
                    {/* Title and X button */}
                    <div className="modal-header border-0">
                        <h1 className="modal-title fs-5">Add new contact</h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
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
