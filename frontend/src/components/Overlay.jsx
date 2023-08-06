import { FaTimes } from "react-icons/fa";
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

const Overlay = ({
  handleClose,
  job,
  handleJob,
  rankByCatg,
  rankBySim,
  handleCatg,
  handleSim,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="text-secondary text-2xl font-bold content bg-white rounded-lg p-2 relative">
        <h2 className="text-primary underline">Settings Page</h2>
        <FaTimes
          className="text-red-500 text-2xl cursor-pointer absolute top-5 right-5"
          onClick={handleClose}
        />

        <div className="flex items-center justify-center flex-col p-2 text-secondary">
          {/* Job Dropdown Box */}
          <div className="p-2">
            <label htmlFor="job" className="mr-2">
              Job:
            </label>
            <select
              className="h-7"
              value={job}
              onChange={(event) => handleJob(event.target.value)}
            >
              <option disabled>Select an option</option>

              {OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Rank By Category Checkbox*/}
          <div className="p-2">
            <label htmlFor="category">Rank By Category: </label>
            <input
              type="checkbox"
              checked={rankByCatg}
              onChange={handleCatg}
              className="ml-4"
            />
          </div>

          {/* Rank By Similarity Checkbox */}
          <div className="p-2">
            <label htmlFor="similarity">Rank By Similarity: </label>
            <input
              type="checkbox"
              checked={rankBySim}
              onChange={handleSim}
              className="ml-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
