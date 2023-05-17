import React from "react";
import { useRef } from "react";
import ContactList from "./ContactList/ContactList.js";
import SearchBar from "./SearchBar/SearchBar.js";

function LeftMenu(props) {
    const [effectiveContacts, setEffectiveContacts] = React.useState(props.contacts);

    const doSearch = function (query) {
        setEffectiveContacts(
            props.contacts.filter((contact) =>
                query === undefined
                    ? true
                    : contact.name.toLowerCase().includes(query.toLowerCase())
            )
        );
    };

    return (
        <div className="col-4 p-0 border-end">
            <div className="card border-0">
                {/* the modal for adding a new chat */}
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
                                <input
                                    type="text"
                                    className="form-control mx-0"
                                    placeholder="Contact's identifier"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* User details and dropdown menu for additional options */}
                <div className="card-header d-flex align-items-center bg-light-gray rounded-0">
                    {/* User pfp and name */}
                    <div>
                        <img
                            src="img/jellyfish.jpeg"
                            className="rounded-circle"
                            alt="avatar"
                        />
                    </div>
                    <span className="w-100 ms-4 fw-bold">Hemi</span>
                    {/* Dropdown menu */}
                    <div className="dropdown">
                        <button
                            className="btn rounded-circle darken-on-hover"
                            id="menu"
                            data-bs-toggle="dropdown"
                        >
                            <i className="bi bi-three-dots-vertical" />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end p-0">
                            <li>
                                <button
                                    type="button"
                                    className="btn dropdown-item darken-on-hover"
                                    data-bs-toggle="modal"
                                    data-bs-target="#new-chat"
                                >
                                    New chat
                                </button>
                            </li>
                            <li>
                                <a
                                    className="dropdown-item darken-on-hover"
                                    href="login.html"
                                >
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <SearchBar doSearch={doSearch} />
                <ContactList contacts={effectiveContacts} />
            </div>
        </div>
    );
}

export default LeftMenu;
