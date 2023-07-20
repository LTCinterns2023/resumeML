import React, { useState } from 'react';
import './App.css';
import ResumeCard from "./components/ResumeCard";
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
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    // Handle the file upload logic here
    console.log('Selected file:', file);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Search query:', searchQuery);
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
          <button onClick={handleSearch} className="search-button">Search</button>
        </div>
      </header>

      <main className='ml-8 mr-8'>
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

        <section>
          <ResumeCard/>
          <ResumeCard/>
          <ResumeCard/>
          <ResumeCard/>
          <ResumeCard/>
          <ResumeCard/>

        </section>

      </main>
      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
}

export default App;