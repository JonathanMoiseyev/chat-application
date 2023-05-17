import React from "react";

function SearchBar() {
    return (
        <div className="card-header input-group bg-white">
            <input
                type="text"
                className="form-control rounded-pill bg-light-gray"
                placeholder="Search"
            />
        </div>
    );
}

export default SearchBar;
