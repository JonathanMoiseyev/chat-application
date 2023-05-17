import React from "react";

function SearchBar({setSearch}) {
    const searchBox = useRef(null);

    const search = function() {
        setSearch(searchBox.current.value);
    }

    return (
        <div className="card-header input-group bg-white">
            <input
                type="text"
                className="form-control rounded-pill bg-light-gray"
                placeholder="Search"
                ref={searchBox}
                onKeyUp={search}
            />
        </div>
    );
}

export default SearchBar;
