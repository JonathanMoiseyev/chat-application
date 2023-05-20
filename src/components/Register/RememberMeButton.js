import React from 'react';

function RememberMeButton( { id }) {
    return (
        <div className="form-check fw-600 mb-4">
            <input type="checkbox" className="form-check-input" id={id} />
            <label className="form-check-label small" htmlFor="register-remember-me">
                Remember me
            </label>
        </div>
    );
}

export default RememberMeButton;