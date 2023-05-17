import React from "react";

function RecipientDetails({img, name}) {
    return (
        <div className="card-header d-flex align-items-center bg-light-gray rounded-0">
            <div>
                <img src={img} className="rounded-circle" alt="avatar" />
            </div>
            <span className="w-100 ms-4">{name}</span>
        </div>
    );
}

export default RecipientDetails;
