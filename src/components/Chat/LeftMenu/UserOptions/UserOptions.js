import {useRef} from "react";
import AddUserModal from "./AddUserModal";
import OptionsDropdown from "./OptionsDropdown";

function UserOptions({user, setUser}) {
    return (
        <>
            <AddUserModal />
            <div className="card-header d-flex align-items-center bg-light-gray rounded-0">
                {/* User pfp and name */}
                <>
                    <div>
                        <img
                            src={user.img}
                            className="rounded-circle"
                            alt="avatar"
                        />
                    </div>
                    <span className="w-100 ms-4 fw-bold">{user.displayName}</span>
                </>
                <OptionsDropdown setUser={setUser} />
            </div>
        </>
    );
}

export default UserOptions;
