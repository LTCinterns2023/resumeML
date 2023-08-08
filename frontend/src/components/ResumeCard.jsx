import React, { useState, useEffect } from "react";
import postResume from "../APICall";
import "../App.css";
import { FaHeart, FaExpand, FaEdit, FaTimes } from "react-icons/fa";

const ResumeCard = ({
  fileObject,
  rank,
  name,
  email,
  phone,
  score,
  showRank,
  like,
  onFileDelete,
  summary,
  index,
}) => {
  const [note, setNote] = useState(false);
  const [expand, setExpand] = useState(false);
  const file = fileObject.file;
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postResume(fileObject.file);
        setApiResponse(response); // Update state with API response
      } catch (error) {
        console.log("Server Error");
      }
    };

    fetchData();
  }, [fileObject.file]); // Run effect when fileObject.file changes

  
  if (file.type !== "application/pdf") {
    return <></>;
  } else {
    return (
      <div className="flex flex-col relative">
        <div className="animate-slideup content grid grid-cols-3 gap-4 p-5 h-[19rem] text-left">
          <div className="col-span-2">
            <object
              data={URL.createObjectURL(file)}
              type="application/pdf"
              className="w-full h-full border-none"
            >
              <p>
                Unable to display PDF file.{" "}
                <a href="../assets/test1.pdf">Download</a> instead.
              </p>
            </object>
          </div>

          <div className="flex items-center">
            <div className="flex flex-col">
              <FaTimes
                className="text-red-500 text-2xl cursor-pointer absolute top-5 right-5"
                onClick={() => onFileDelete(file)}
              />

              <div className="flex flex-col">
                {showRank && (
                  <div className="mb-3">
                    <div className="text-primary">
                      <b>Rank:</b> 2{" "}
                    </div>
                    <div className="text-primary">
                      <b>Score:</b> 98.45%{" "}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col mt3 truncate text-align-left text-primary">
                <div>
                  <b>Name: </b> {apiResponse === null ? "Loading..." : apiResponse.applicantName}
                </div>
                <div>
                  <b>Best Fit:</b> Quality Assurance Engineer
                </div>
                <div>
                  <b>Email:</b> {apiResponse === null ? "Loading..." : apiResponse.applicantEmail}
                </div>
                <div>
                  <b>Phone:</b> {apiResponse === null ? "Loading..." : apiResponse.applicantNumber}
                </div>
              </div>

              <div className="flex flex-col mt-3">
                <div className="text-secondary">
                  <b>Summary of Qualifications: </b>
                  <div className="line-clamp-6 text-justify text-black">
                    {apiResponse === null ? "Loading..." : apiResponse.resumeSummary}
                  </div>
                </div>
                <div className="mt-3 flex flex-row">
                  <div className="text-secondary">
                    <b>Options:</b>
                  </div>
                  <div className="flex justify-end ml-auto">
                    {like ? (
                      <FaHeart style={{ color: "red" }} className="mr-3" />
                    ) : (
                      <FaHeart style={{ color: "gray" }} className="mr-3" />
                    )}
                    <FaExpand
                      className="mr-3"
                      onClick={() => {
                        return setExpand(!expand);
                      }}
                    />
                    <FaEdit
                      className=""
                      onClick={() => {
                        return setNote(!note);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <>
          {expand && (
            <div className="content pl-5 pr-5 pb-6 text-left animate-slideleft">
              <div className="flex flex-row">
                <h2 className="text-secondary">
                  Summary of {apiResponse === null ? "Loading..." : apiResponse.applicantName}'s Qualifications
                </h2>
                <div className="flex ml-auto">
                  <FaTimes
                    className="text-red-500 text-2xl cursor-pointer mt-4"
                    onClick={() => setExpand(!expand)}
                  />
                </div>
              </div>
              <p> {apiResponse === null ? "Loading..." : apiResponse.resumeSummary} </p>
            </div>
          )}
          {note && (
            <div className="content pl-5 pr-5 pb-8 text-left animate-slideleft">
              <div className="flex flex-row">
                <h2 className="text-secondary">Notes on {apiResponse === null ? "Loading..." : apiResponse.applicantName}'s Profile</h2>
                <div className="flex ml-auto">
                  <FaTimes
                    className="text-red-500 text-2xl cursor-pointer mt-4"
                    onClick={() => setNote(!note)}
                  />
                </div>
              </div>
              <textarea type="text" className="w-full h-32" maxLength="1000" />
              <div className="flex justify-center">
                <button
                  className="pb-3 pt-3 mt-4 w-full rounded-lg"
                  value={"aksdfhasdl;k"}
                  href="javascript:alert(1)"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </>
      </div>
    );
  }
};

export default ResumeCard;
