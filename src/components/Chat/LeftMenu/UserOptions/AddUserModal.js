import React from "react";

function AddUserModal() {
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
                        <input
                            type="text"
                            className="form-control mx-0"
                            placeholder="Contact's identifier"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddUserModal;
