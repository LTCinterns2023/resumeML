import "./ResumeSortingWebsite.css";
import React, { useState } from "react";

const ResumeSortingWebsite = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [location, setLocation] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [educationFilter, setEducationFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  const handleLocationSearch = (event) => {
    setLocation(event.target.value);
  };

  const handleExperienceFilter = (event) => {
    setExperienceFilter(event.target.value);
  };

  const handleCompanyFilter = (event) => {
    setCompanyFilter(event.target.value);
  };

  const handleCategoryFilter = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleEducationFilter = (event) => {
    setEducationFilter(event.target.value);
  };

  const handleLanguageFilter = (event) => {
    setLanguageFilter(event.target.value);
  };

  const handleSearch = () => {
    // Perform the search based on the selected filters
    // You can implement the logic to search the resumes using the uploadedFile, location, filters, etc.
    console.log("Searching resumes...");
  };

  const url = "http://0.0.0.0:3000/";

  const handleAPI = (event) => {
    return fetch(url + "model/3", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <h1>Resume Sorting Website</h1>
      <div className="form-group">
        <label htmlFor="fileUpload">Upload Resume:</label>
        <input
          type="file"
          id="fileUpload"
          accept=".pdf,.doc,.docx"
          onChange={handleFileUpload}
        />
      </div>
      <div className="form-group">
        <label htmlFor="locationSearch">Location:</label>
        <input
          type="text"
          id="locationSearch"
          value={location}
          onChange={handleLocationSearch}
        />
      </div>
      <div className="form-group">
        <label htmlFor="experienceFilter">Experience:</label>
        <input
          type="text"
          id="experienceFilter"
          value={experienceFilter}
          onChange={handleExperienceFilter}
        />
      </div>
      <div className="form-group">
        <label htmlFor="companyFilter">Company:</label>
        <input
          type="text"
          id="companyFilter"
          value={companyFilter}
          onChange={handleCompanyFilter}
        />
      </div>
      <div className="form-group">
        <label htmlFor="categoryFilter">Category:</label>
        <input
          type="text"
          id="categoryFilter"
          value={categoryFilter}
          onChange={handleCategoryFilter}
        />
      </div>
      <div className="form-group">
        <label htmlFor="educationFilter">Education:</label>
        <input
          type="text"
          id="educationFilter"
          value={educationFilter}
          onChange={handleEducationFilter}
        />
      </div>
      <div className="form-group">
        <label htmlFor="languageFilter">Language:</label>
        <input
          type="text"
          id="languageFilter"
          value={languageFilter}
          onChange={handleLanguageFilter}
        />
      </div>

      <div className="form-group">
        <label htmlFor="languageFilter">Insert Test:</label>
        <input
          type="text"
          id="languageFilter"
          value={languageFilter}
          onChange={handleLanguageFilter}
        />
      </div>

      <button className="search-button" onClick={handleAPI}>
        Connect To API Server
      </button>
    </div>
  );
};

export default ResumeSortingWebsite;
