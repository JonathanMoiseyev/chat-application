import React from "react";
import AddUserModal from "./AddUserModal";
import OptionsDropdown from "./OptionsDropdown";

function UserOptions() {
    return (
        <>
            <AddUserModal />
            <div className="card-header d-flex align-items-center bg-light-gray rounded-0">
                {/* User pfp and name */}
                <>
                    <div>
                        <img
                            src="img/jellyfish.jpeg"
                            className="rounded-circle"
                            alt="avatar"
                        />
                    </div>
                    <span className="w-100 ms-4 fw-bold">Hemi</span>
                </>
                <OptionsDropdown />
            </div>
        </>
    );
}

export default UserOptions;
