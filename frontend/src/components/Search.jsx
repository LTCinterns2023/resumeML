import React from "react";

const Search = ({
  handleFileUpload,
  handleKeywordSubmit,
  currentKeyword,
  handleKeywordChange,
  handleSearch,
}) => {
  return (
    <>
      {/* Search With Keywords */}
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
        <button onClick={handleSearch} className="search-button px-5">
          Search
        </button>
      </div>

      {/* Upload Feature */}
      <div className="mt-4 mb-4">
        <label 
          htmlFor="fileInput" 
          className="bg-gray-100 text-black text-1.5rem pl-32 pr-32 py-1 rounded-lg cursor-pointer">
          Upload Files
        </label>
        <input 
          id="fileInput" 
          type="file" 
          className="hidden" 
          onChange={handleFileUpload}
          multiple
        />
      </div>
    </>
  );
};
export default Search;
