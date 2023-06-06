import React from "react";
import { useRef } from "react";

function SearchBar({ doSearch }) {
    const searchBox = useRef(0);

    return (
        <div className="card-header input-group bg-white">
            <input
                type="text"
                className="form-control rounded-pill bg-light-gray"
                placeholder="Search"
                ref={searchBox}
                onKeyUp={() => doSearch(searchBox.current.value)}
            />
        </div>
    );
}

export default SearchBar;
