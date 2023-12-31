/** @format */

import { defaultUser } from "../../../shared/userApi";

function OptionsDropdown({ setUser }) {
    return (
        <div className="dropdown">
            <button className="btn rounded-circle darken-on-hover" id="menu" data-bs-toggle="dropdown">
                <i className="bi bi-three-dots-vertical" />
            </button>
            <ul className="dropdown-menu dropdown-menu-end p-0">
                <li>
                    <button
                        type="button"
                        className="btn dropdown-item darken-on-hover"
                        data-bs-toggle="modal"
                        data-bs-target="#new-chat"
                        value="new-chat"
                    >
                        New chat
                    </button>
                </li>
                <li>
                    <a
                        className="dropdown-item darken-on-hover"
                        value="logout"
                        href="#/"
                        onClick={() => setUser(defaultUser())}
                    >
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default OptionsDropdown;
