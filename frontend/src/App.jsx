import React, { useState } from 'react';
import './App.css';
import Result from "./components/Result";
import SideBar from "./components/SideBar";
import {
  toggleExperienceFilter,
  toggleSkillFilter,
  toggleLanguageFilter,
  toggleEducationFilter,
  handleExperienceChange,
  handleSkillChange,
  handleLanguageChange,
  handleEducationChange
} from './Functions';


function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Search query:', searchQuery);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  

  const [experienceFilterOpen, setExperienceFilterOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState([]);

  const [skillFilterOpen, setSkillFilterOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [languageFilterOpen, setLanguageFilterOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const [educationFilterOpen, setEducationFilterOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState([]);


  return (
    <div className="App">
      <header>
        <h1>Resume Selector</h1>

        <div className="search-bar">
          <div className='textplace'>
          <input
            type="text"
            placeholder="Enter keywords..."
            value={searchQuery}
            onChange={handleInputChange}
            className="search-input"
          />
          <input type="file" onChange={handleFileSelect} />
          </div>

          <div className='button'>
          <button onClick={handleSearch} className="search-button">Search</button>
          <button onClick={() => console.log(selectedFile)} className="search-buttons">Upload</button>
         </div>

        </div>
      </header>

      <main>

        <SideBar
          experienceFilterOpen={experienceFilterOpen}
          toggleExperienceFilter={() => toggleExperienceFilter(experienceFilterOpen, setExperienceFilterOpen)}
          selectedExperience={selectedExperience}
          handleExperienceChange={(event) => handleExperienceChange(event, selectedExperience, setSelectedExperience)}
          skillFilterOpen={skillFilterOpen}
          toggleSkillFilter={() => toggleSkillFilter(skillFilterOpen, setSkillFilterOpen)}
          selectedSkills={selectedSkills}
          handleSkillChange={(event) => handleSkillChange(event, selectedSkills, setSelectedSkills)}
          languageFilterOpen={languageFilterOpen}
          toggleLanguageFilter={() => toggleLanguageFilter(languageFilterOpen, setLanguageFilterOpen)}
          selectedLanguages={selectedLanguages}
          handleLanguageChange={(event) => handleLanguageChange(event, selectedLanguages, setSelectedLanguages)}
          educationFilterOpen={educationFilterOpen}
          toggleEducationFilter={() => toggleEducationFilter(educationFilterOpen, setEducationFilterOpen)}
          selectedEducation={selectedEducation}
          handleEducationChange={(event) => handleEducationChange(event, selectedEducation, setSelectedEducation)}
        />

        <section className='content'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </section>

      </main>
      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
}

export default App;