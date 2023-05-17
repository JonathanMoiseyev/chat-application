import React from 'react';

function InputField({ text, name, type, id, value, handleChange }) {
    return (
        <div className="fw-600 mb-4">
            <label htmlFor="register-username" className="form-label">
                {text}
            </label>
            <input type={type} name={name}
                className="form-control input"
                id={id} value={value}
                onChange={handleChange}
            />
        </div>
    );
}

export default InputField;