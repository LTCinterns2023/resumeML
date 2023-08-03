import { KeywordBubble } from "./components/KeywordBubble";
import React, { useState } from "react";
import "./App.css";
import ResumeCard from "./components/ResumeCard";
import SideBar from "./components/SideBar";
import UploadPanel from "./components/UploadPanel";
import Search from "./components/Search";
import Overlay from "./components/Overlay";
import {
  toggleExperienceFilter,
  toggleSkillFilter,
  toggleLanguageFilter,
  toggleEducationFilter,
  handleExperienceChange,
  handleSkillChange,
  handleLanguageChange,
  handleEducationChange,
  deleteKeyword,
} from "./Functions";
//import search.js

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // File Path Submit
  const [filePath, setFilePath] = useState([]);
  const [currentFilePath, setCurrentFilePath] = useState("");
  const handleFilePathChange = (event) => {
    setCurrentFilePath(event.target.value);
  };
  const handleFilePathSubmit = (event) => {
    event.preventDefault();
    if (currentFilePath.trim() !== "") {
      setFilePath((prevFilePath) => [...prevFilePath, currentFilePath.trim()]);
      setCurrentFilePath("");
    }
  };

  //keyword search
  const [keywords, setKeywords] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const handleKeywordChange = (event) => {
    setCurrentKeyword(event.target.value);
  };
  const handleKeywordSubmit = (event) => {
    event.preventDefault();
    if (currentKeyword.trim() !== "") {
      setKeywords((prevKeywords) => [...prevKeywords, currentKeyword.trim()]);
      setCurrentKeyword("");
    }
  };

  const handleSearch = () => {
    // Combine with searchWithKeywords in search.js and ResumeCard.jsx
    console.log("Search query:", searchQuery);
    // const searchResults = searchWithKeywords(keywords);
  };

  // State Variables
  const [experienceFilterOpen, setExperienceFilterOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState([]);

  const [skillFilterOpen, setSkillFilterOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [languageFilterOpen, setLanguageFilterOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const [educationFilterOpen, setEducationFilterOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState([]);

  // Setting Page
  const [showOverlay, setShowOverlay] = useState(false);
  const [job, setJob] = useState("Advocate");
  const [rankByCatg, setRankByCatg] = useState(false);
  const [rankBySim, setRankBySim] = useState(false);

  return (
    <div className="App">
      <header>
        <div className="favourite-section">
          {/* Side Settings */}
          <div>🤍 {/* Need to make a favourite page */}</div>
          <div className="ml-4" onClick={() => setShowOverlay(!showOverlay)}>
            ⚙️ {/* Setting Page */}
          </div>
        </div>

        {/* Render the overlay only when showOverlay is true */}
        {showOverlay && (
          <Overlay 
            job={job}
            rankByCatg={rankByCatg}
            rankBySim={rankBySim}
            handleClose={() => setShowOverlay(!showOverlay)} 
            handleJob={(newJob) => setJob(newJob)}
            handleCatg={() => setRankByCatg(!rankByCatg)}
            handleSim={() => setRankBySim(!rankBySim)}
          />
        )}

        {/* Header Panel */}
        <h1>Resume Selector</h1>
        <Search
          handleFilePathSubmit={handleFilePathSubmit}
          currentFilePath={currentFilePath}
          handleFilePathChange={handleFilePathChange}
          handleKeywordSubmit={handleKeywordSubmit}
          currentKeyword={currentKeyword}
          handleKeywordChange={handleKeywordChange}
          handleSearch={handleSearch}
        />

        <KeywordBubble
          keyword={keywords}
          deleteKeyword={deleteKeyword}
          keywords={keywords}
          setKeywords={setKeywords}
        />
      </header>

      <main className="ml-8 mr-8">
        {/* SideBar */}
        <SideBar
          experienceFilterOpen={experienceFilterOpen}
          toggleExperienceFilter={() =>
            toggleExperienceFilter(
              experienceFilterOpen,
              setExperienceFilterOpen
            )
          }
          selectedExperience={selectedExperience}
          handleExperienceChange={(event) =>
            handleExperienceChange(
              event,
              selectedExperience,
              setSelectedExperience
            )
          }
          skillFilterOpen={skillFilterOpen}
          toggleSkillFilter={() =>
            toggleSkillFilter(skillFilterOpen, setSkillFilterOpen)
          }
          selectedSkills={selectedSkills}
          handleSkillChange={(event) =>
            handleSkillChange(event, selectedSkills, setSelectedSkills)
          }
          languageFilterOpen={languageFilterOpen}
          toggleLanguageFilter={() =>
            toggleLanguageFilter(languageFilterOpen, setLanguageFilterOpen)
          }
          selectedLanguages={selectedLanguages}
          handleLanguageChange={(event) =>
            handleLanguageChange(event, selectedLanguages, setSelectedLanguages)
          }
          educationFilterOpen={educationFilterOpen}
          toggleEducationFilter={() =>
            toggleEducationFilter(educationFilterOpen, setEducationFilterOpen)
          }
          selectedEducation={selectedEducation}
          handleEducationChange={(event) =>
            handleEducationChange(
              event,
              selectedEducation,
              setSelectedEducation
            )
          }
        />

        {/* Current Viewable Paths and Each Resume */}
        <section>
          <UploadPanel paths={filePath} />
          <ResumeCard />
          <ResumeCard />
          <ResumeCard />
          <ResumeCard />
          <ResumeCard />
          <ResumeCard />
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="mr-8">
          <h4>LTC Interns - Ontario Ministry of Transportation</h4>
          <h4>May - August 2023</h4>
        </div>
      </footer>
    </div>
  );
}

export default App;
