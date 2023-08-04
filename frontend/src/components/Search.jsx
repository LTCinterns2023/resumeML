import React from "react";

const Search = ({
  handleFilePathSubmit,
  currentFilePath,
  handleFilePathChange,
  handleKeywordSubmit,
  currentKeyword,
  handleKeywordChange,
  handleSearch,
}) => {
  return (
    <>
      {" "}
      <div className="search-bar">
        <form onSubmit={handleFilePathSubmit} className="textplace">
          <input
            type="text"
            placeholder="Path to Resume Folder..."
            value={currentFilePath}
            onChange={handleFilePathChange}
            className="search-input"
          />
        </form>
        <button onClick={handleFilePathSubmit} className="search-button">
          Display
        </button>
      </div>
      <div className="search-bar">
        <form onSubmit={handleKeywordSubmit} className="textplace">
          <input
            type="text"
            placeholder="Enter keywords..."
            value={currentKeyword}
            onChange={handleKeywordChange}
            className="search-input"
          />
        </form>
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
    </>
  );
}
export default Search;
