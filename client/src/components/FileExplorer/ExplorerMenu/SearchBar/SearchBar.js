import React from 'react';
import './SearchBar.css';

const SearchBar = ({ input: keyword, onChange: setKeyword }) => {

    return (

        <div className="searchBar">
            <input id="searchBar-search-box"
                type="text"
                className="searchBar-search-box"
                name="q"
                onChange={(e) => setKeyword(e.target.value.toLowerCase())}
                value={keyword}
                placeholder={"search"}
                autoComplete="off" />
            <label for="searchBar-search-box">
                <span className="searchBar-search-icon">
                    <img alt="searchbar" src="https://img.icons8.com/android/14/000000/search.png" />
                </span>
            </label>
        </div>
    );
}

export default SearchBar;