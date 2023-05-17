import React from "react";

function RecipientDetails(props) {
    return (
        <div className="card-header d-flex align-items-center bg-light-gray rounded-0">
            <div>
                <img src="img/whale.jpeg" className="rounded-circle" alt="avatar" />
            </div>
            <span className="w-100 ms-4">Yuval Grofman</span>
        </div>
    );
}

export default RecipientDetails;
