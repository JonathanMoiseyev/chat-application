import React from 'react';
import { useNavigate } from 'react-router-dom';
function Link({ initialText, linkText, link }) {
    const navigate = useNavigate();
    return (
        <>
            <span>{initialText}</span>
            <span 
                className="text-decoration-none darken-on-hover light-purple fw-600"
                onClick={() => navigate(link)}
            >
                {linkText}
            </span>
        </>
    );
}

export default Link;