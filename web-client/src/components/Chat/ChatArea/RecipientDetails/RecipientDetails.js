/** @format */

import { React, useEffect, useRef } from "react";
// import usersDB from "../../../../db/usersDB";

function RecipientDetails({ chosenContact }) {
    const imgWrapperRef = useRef(0),
        displayNameRef = useRef(0);

    useEffect(() => {
        if (chosenContact != null) {
            let chosenContactDetails = chosenContact.user;
            imgWrapperRef.current.innerHTML = `<img src="${chosenContactDetails.profilePic}" 
                                                    class="rounded-circle profile-picture" 
                                                    alt="avatar"/>`;
            displayNameRef.current.innerHTML = chosenContactDetails.displayName;
        }
    });

    return (
        <div className="card-header d-flex align-items-center bg-light-gray rounded-0">
            <div id="contact-avatar" ref={imgWrapperRef}></div>
            <span className="w-100 ms-4" ref={displayNameRef}></span>
        </div>
    );
}

export default RecipientDetails;
