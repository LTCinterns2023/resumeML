import { KeywordBubble } from "./components/KeywordBubble";
import React, { useState, useEffect } from "react";
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
import { FaHeart } from "react-icons/fa";
import getSearch from "./APICall"

const App = () => {
  // File Submission
  const [filesUpload, setFilesUpload] = useState([]);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      // Accessing the files
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setFilesUpload([...filesUpload, {file:file, applicantID:-1}]);
      }
    } else {
      console.log("No files selected.");
    }
  };

  const handleFileDelete = (fileToRemove) => {
    setFilesUpload((prevFiles) =>
      prevFiles.filter((existingFile) => existingFile.file !== fileToRemove)
    );
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
    console.log("Search query:", keywords);
    const fetchSearch = async () => {
      try {
        console.log("HIII");
        const response = await getSearch(keywords);
        // All Those That Pass The Filter Have Their ID In Response
        setFilesUpload(filesUpload.filter((file) => response.validIDs.includes(file.applicantID))); 
    
      } catch (error) {
        console.log("Server Error");
      }
    };
    fetchSearch(keywords);
  };

  // SideBar CheckBoxes
  const [experienceFilterOpen, setExperienceFilterOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [skillFilterOpen, setSkillFilterOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [languageFilterOpen, setLanguageFilterOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [educationFilterOpen, setEducationFilterOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState([]);

  // Like Feature
  const [like, setLike] = useState(false);

  // Overlay/Side Page
  const [showOverlay, setShowOverlay] = useState(false);
  const [job, setJob] = useState("Advocate");
  const [rankByCatg, setRankByCatg] = useState(false);
  const [rankBySim, setRankBySim] = useState(false);

  return (
    <div className="App relative">
      <div>
        <header>
          <div className="favourite-section mt-2">
            {/* Side Settings */}
            <div onClick={() => setLike(!like)} className="mt-1">
              {like ? (
                <FaHeart style={{ color: "red" }} className="ml-4" />
              ) : (
                <FaHeart style={{ color: "white" }} className="ml-4" />
              )}
            </div>
            <div className="ml-5" onClick={() => setShowOverlay(!showOverlay)}>
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
            handleFileUpload={handleFileUpload}
            handleKeywordSubmit={handleKeywordSubmit}
            currentKeyword={currentKeyword}
            handleKeywordChange={handleKeywordChange}
            handleSearch={handleSearch}
          />

          <KeywordBubble
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
              handleLanguageChange(
                event,
                selectedLanguages,
                setSelectedLanguages
              )
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
            <UploadPanel files={filesUpload} onFileDelete={handleFileDelete} />
            
            {filesUpload.map((fileObject, index) => (
              <ResumeCard
                key={index}
                index={index}
                fileObject={fileObject}
                onFileDelete={handleFileDelete}
              />
            ))}
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-primary">
        <div className="mr-8 bottom-0 right-0">
          <h4>LTC Interns - Ontario Ministry of Transportation</h4>
          <h4>May - August 2023</h4>
        </div>
      </footer>
    </div>
  );
};

export default App;
