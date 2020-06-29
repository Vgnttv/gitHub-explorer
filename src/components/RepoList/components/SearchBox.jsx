import React from "react";
import "./SearchBox.css";

const SearchBox = ({ search, handleInput }) => {
  return (
    <div className="searchBox">
      <input
        type="text"
        value={search}
        onChange={handleInput}
        placeholder="Enter repo title here..."
        className="inputField"
        data-cy="searchInput"
      />
    </div>
  );
};

export default SearchBox;
