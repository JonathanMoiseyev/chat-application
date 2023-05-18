import React from 'react';

function InputField({ text, name, type, id, value, handleChange, accept = null}) {
    return (
        <div className="fw-600 mb-4">
            <label htmlFor={"register-" + name} className="form-label">
                {text}
            </label>
            <input type={type} name={name}
                className="form-control input"
                id={id} value={value}
                onChange={handleChange}
                accept={accept}
            />
        </div>
    );
}

export default InputField;