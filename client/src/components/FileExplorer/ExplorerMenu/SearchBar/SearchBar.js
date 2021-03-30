import React from 'react';
import './SearchBar.css'
import { BiSearch } from "react-icons/bi";

const SearchBar = ({ input: keyword, onChange: setKeyword }) => {
    const BarStyling = { width: "10rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };

    return (
        // <input className="searchbar"
        //     style={BarStyling}
        //     key="random1"
        //     value={keyword}
        //     placeholder={"search"}
        // autocomplete="off"
        //     onChange={(e) => setKeyword(e.target.value)}
        // />
        <div>
            <label for="searchBar-search-box">
                <span class="searchBar-search-icon">
                    <img src="https://img.icons8.com/android/14/000000/search.png" />
                </span>
            </label>
            <input id="searchBar-search-box"
                autocomplete="off"
                type="text"
                class="searchBar-search-box"
                name="q" />
        </div>
    );
}

export default SearchBar;