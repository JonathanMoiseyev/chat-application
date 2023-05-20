import AddUserModal from "./AddUserModal";
import OptionsDropdown from "./OptionsDropdown";

function UserOptions({user, setUser, refreshContacts }) {
    return (
        <>
            <AddUserModal
                username={user.username}
                refreshContacts={refreshContacts}
            />
            <div className="card-header d-flex align-items-center bg-light-gray rounded-0">
                {/* User pfp and name */}
                <>
                    <div>
                        <img
                            src={user.img}
                            className="rounded-circle profile-picture"
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
