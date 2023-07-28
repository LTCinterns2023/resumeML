export const toggleExperienceFilter = (experienceFilterOpen, setExperienceFilterOpen) => {
  setExperienceFilterOpen(!experienceFilterOpen);
};
  
export const toggleSkillFilter = (skillFilterOpen, setSkillFilterOpen) => {
  setSkillFilterOpen(!skillFilterOpen);
};

export const toggleLanguageFilter = (languageFilterOpen, setLanguageFilterOpen) => {
  setLanguageFilterOpen(!languageFilterOpen);
};

export const toggleEducationFilter = (educationFilterOpen, setEducationFilterOpen) => {
  setEducationFilterOpen(!educationFilterOpen);
};

export const handleExperienceChange = (event, selectedExperience, setSelectedExperience) => {
  const { value } = event.target;
  setSelectedExperience((prevSelectedExperience) => {
    if (prevSelectedExperience.includes(value)) {
      return prevSelectedExperience.filter((experience) => experience !== value);
    } else {
      return [...prevSelectedExperience, value];
    }
  });
};

export const handleSkillChange = (event, selectedSkills, setSelectedSkills) => {
  const { value } = event.target;
  setSelectedSkills((prevSelectedSkills) => {
    if (prevSelectedSkills.includes(value)) {
      return prevSelectedSkills.filter((skill) => skill !== value);
    } else {
      return [...prevSelectedSkills, value];
    }
  });
};

export const handleLanguageChange = (event, selectedLanguages, setSelectedLanguages) => {
  const { value } = event.target;
  setSelectedLanguages((prevSelectedLanguages) => {
    if (prevSelectedLanguages.includes(value)) {
      return prevSelectedLanguages.filter((language) => language !== value);
    } else {
      return [...prevSelectedLanguages, value];
    }
  });
};

export const handleEducationChange = (event, selectedEducation, setSelectedEducation) => {
  const { value } = event.target;
  setSelectedEducation((prevSelectedEducation) => {
    if (prevSelectedEducation.includes(value)) {
      return prevSelectedEducation.filter((education) => education !== value);
    } else {
      return [...prevSelectedEducation, value];
    }
  });
};

export function deleteKeyword(keywordToDelete, keywords, setKeywords) {
  setKeywords((prevKeywords) => prevKeywords.filter((keyword) => keyword !== keywordToDelete));
}


