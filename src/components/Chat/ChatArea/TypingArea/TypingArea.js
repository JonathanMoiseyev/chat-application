import React from "react";

function TypingArea(props) {
    return (
        <div className="card-footer input-group bg-light-gray rounded-0">
            <input
                type="text"
                className="form-control rounded-pill"
                placeholder="Type a message"
            />
        </div>
    );
}

export default TypingArea;
