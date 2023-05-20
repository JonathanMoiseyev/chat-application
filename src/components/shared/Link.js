import React from 'react';

function Link({ initialText, linkText, link }) {
    return (
        <>
            <span>{initialText}</span>
            <a className="text-decoration-none darken-on-hover light-purple fw-600" href={link}>
                {linkText}
            </a>
        </>
    );
}

export default Link;