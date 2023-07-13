import React from 'react';

function SideBar({
  experienceFilterOpen,
  toggleExperienceFilter,
  selectedExperience,
  handleExperienceChange,
  skillFilterOpen,
  toggleSkillFilter,
  selectedSkills,
  handleSkillChange,
  languageFilterOpen,
  toggleLanguageFilter,
  selectedLanguages,
  handleLanguageChange,
  educationFilterOpen,
  toggleEducationFilter,
  selectedEducation,
  handleEducationChange,
}) {
  return (
    <aside className="sidebar">
      <h2>Filters</h2>
      <div className="filter">
        <label onClick={toggleExperienceFilter} className="filter-label">
          Experience
        </label>
        {experienceFilterOpen && (
          <div className="filter-options animate-slideright">
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
          <div className="filter-options animate animate-slideright">
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
          <div className="filter-options animate-slideright">
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
        <br></br>
        <label onClick={toggleEducationFilter} className="filter-label">
          Education
        </label>
        {educationFilterOpen && (
          <div className="filter-options animate-slideright">
            <label>
              <input
                type="checkbox"
                value="Master"
                checked={selectedEducation.includes('Master')}
                onChange={handleEducationChange}
              />
              Master
            </label>
            <label>
              <input
                type="checkbox"
                value="PhD"
                checked={selectedEducation.includes('PhD')}
                onChange={handleEducationChange}
              />
              PhD
            </label>
            <label>
              <input
                type="checkbox"
                value="Bachelor"
                checked={selectedEducation.includes('Bachelor')}
                onChange={handleEducationChange}
              />
              Bachelor
            </label>
            <label>
              <input
                type="checkbox"
                value="High school"
                checked={selectedEducation.includes('High school')}
                onChange={handleEducationChange}
              />
              High school
            </label>
          </div>
        )}
      </div>
    </aside>
  );
}

export default SideBar;