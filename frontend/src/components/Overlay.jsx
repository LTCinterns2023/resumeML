import { React, useState } from "react";
import { FaHeart, FaExpand, FaEdit, FaTimes } from "react-icons/fa";
const others = ["Advocate", "Arts", "Health and fitness"];
const business = [
  "Business Analyst",
  "HR",
  "PMO",
  "Sales",
  "Operations Manager",
];
const developers = [
  "DotNet Developer",
  "ETL Developer",
  "Java Developer",
  "Python Developer",
  "SAP Developer",
  "Web Designing",
];
const engineer = [
  "Civil Engineer",
  "Electrical Engineering",
  "Mechanical Engineer",
];
const backend = [
  "Blockchain",
  "Hadoop",
  "Database",
  "Data Science",
  "DevOps Engineer",
  "Network Security Engineer",
];
const QA = ["Automation Testing", "Testing"];

const OPTIONS = [
  ...others,
  ...business,
  ...developers,
  ...engineer,
  ...backend,
  ...QA,
];
const Overlay = (props) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="text-secondary text-2xl font-bold content bg-white rounded-lg p-8 grid grid-cols-2 gap-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-primary underline">Settings Page</h2>
          <FaTimes
            className="text-red-500 text-2xl cursor-pointer"
            onClick={props.handleClose}
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="job" className="mr-2">
            Job:
          </label>
          <select id="job" className="h-7">
            <option value="" disabled>
              Select an option
            </option>
            {OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <label htmlFor="category">Rank By Category: </label>

          <input
            type="checkbox"
            checked={isToggled}
            onChange={handleToggle}
            id="category"
            className="mr-2"
          />
        </div>
        <div className="flex items-center">
        <label htmlFor="similarity">Rank By Similarity: </label>

          <input
            type="checkbox"
            checked={isToggled}
            onChange={handleToggle}
            id="similarity"
            className="mr-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Overlay;
