import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Result from "./components/Result";

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [rank, setRank] = useState([1, 2 , 3, 4, 5,]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Search query:', searchQuery);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const [experienceFilterOpen, setExperienceFilterOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState([]);

  const [skillFilterOpen, setSkillFilterOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [languageFilterOpen, setLanguageFilterOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const toggleExperienceFilter = () => {
    setExperienceFilterOpen(!experienceFilterOpen);
  };

  const toggleSkillFilter = () => {
    setSkillFilterOpen(!skillFilterOpen);
  };

  const toggleLanguageFilter = () => {
    setLanguageFilterOpen(!languageFilterOpen);
  };

  const handleExperienceChange = (event) => {
    const { value } = event.target;
    setSelectedExperience((prevSelectedExperience) => {
      if (prevSelectedExperience.includes(value)) {
        return prevSelectedExperience.filter((experience) => experience !== value);
      } else {
        return [...prevSelectedExperience, value];
      }
    });
  };

  const handleSkillChange = (event) => {
    const { value } = event.target;
    setSelectedSkills((prevSelectedSkills) => {
      if (prevSelectedSkills.includes(value)) {
        return prevSelectedSkills.filter((skill) => skill !== value);
      } else {
        return [...prevSelectedSkills, value];
      }
    });
  };

  const handleLanguageChange = (event) => {
    const { value } = event.target;
    setSelectedLanguages((prevSelectedLanguages) => {
      if (prevSelectedLanguages.includes(value)) {
        return prevSelectedLanguages.filter((lang) => lang !== value);
      } else {
        return [...prevSelectedLanguages, value];
      }
    });
  };

  return (
    <div className="App">
      <header>
        <h1>Resume Selector</h1>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter keywords..."
            value={searchQuery}
            onChange={handleInputChange}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">Search</button>
        </div>

        <div>
          <input type="file"/>
          <button className="upload-button">Upload</button>
        </div>

      </header>

      <main>
        <aside className="sidebar">
          <h2>Filters</h2>
          <div className="filter">
            <label onClick={toggleExperienceFilter} className="filter-label">
              Experience
            </label>
            {experienceFilterOpen && (
              <div className="filter-options">
                <label>
                  <input
                    type="checkbox"
                    value="Junior"
                    checked={selectedExperience.includes('Junior')}
                    onChange={handleExperienceChange}
                  />
                  Junior
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Senior"
                    checked={selectedExperience.includes('Senior')}
                    onChange={handleExperienceChange}
                  />
                  Senior
                </label>
              </div>
            )}
            <br></br>
            <label onClick={toggleSkillFilter} className="filter-label">
              Skills
            </label>
            {skillFilterOpen && (
              <div className="filter-options">
                <label>
                  <input
                    type="checkbox"
                    value="C/C++"
                    checked={selectedSkills.includes('C/C++')}
                    onChange={handleSkillChange}
                  />
                  C/C++
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Python"
                    checked={selectedSkills.includes('Python')}
                    onChange={handleSkillChange}
                  />
                  Python
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="JavaScript"
                    checked={selectedSkills.includes('JavaScript')}
                    onChange={handleSkillChange}
                  />
                  JavaScript
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="React"
                    checked={selectedSkills.includes('React')}
                    onChange={handleSkillChange}
                  />
                  React
                </label>
              </div>
            )}
            <br></br>
            <label onClick={toggleLanguageFilter} className="filter-label">
              Language
            </label>
            {languageFilterOpen && (
              <div className="filter-options">
                <label>
                  <input
                    type="checkbox"
                    value="English"
                    checked={selectedLanguages.includes('English')}
                    onChange={handleLanguageChange}
                  />
                  English
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="French"
                    checked={selectedLanguages.includes('French')}
                    onChange={handleLanguageChange}
                  />
                  French
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Korean"
                    checked={selectedLanguages.includes('Korean')}
                    onChange={handleLanguageChange}
                  />
                  Korean
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Chinese"
                    checked={selectedLanguages.includes('Chinese')}
                    onChange={handleLanguageChange}
                  />
                  Chinese
                </label>
              </div>
            )}
          </div>
          <br></br>
          {/* Other filters */}
        </aside>
        <section className="content">
          {rank.map((index, items) => {
            <Result/>
          })}      
        </section>
      </main>
      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
}

export default App;