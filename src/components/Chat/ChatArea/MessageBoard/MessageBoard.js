import React from "react";

function MessageBoard(props) {
    return (
        <div className="card-body p-0">
            <ul className="list-unstyled overflow-auto m-0 pt-2" id="chat"></ul>
        </div>
    );
}

export default MessageBoard;
