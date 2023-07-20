import React, { useState } from "react";
import APICall from "../APICall";
import "../App.css";
import file from "../assets/test1.pdf";
import { FaHeart, FaExpand, FaEdit, FaTimes } from "react-icons/fa";

const ResumeCard = (props) => {
  const rank = props.rank;
  const name = props.name;
  const email = props.email;
  const phone = props.phone;
  const score = props.score;
  const summary =
    "Ethan Rong is a computer science student at the University of Western Ontario with a 4.0 GPA. Proficient in Python, Java, and web development, he has experience with tools like PyCharm, Jupyter Notebook, and GitHub. Ethan has excelled in hackathons, placing 4th out of 80 teams at Hack Western 9 and 2nd at MapleHacks. Notable projects include Nourish-Now, a web app using React JS and ML to forecast WIC food program demand, and Hover-Touch, enabling non-verbal communication through air-written messages. He has also developed Eye-Explore, a mobile app for the visually impaired. Ethan's extracurricular involvements include Western AI and the Global Research Council.";
  const showRank = false;
  const like = false;

  const [note, setNote] = useState(false);
  const [expand, setExpand] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="animate-slideup content grid grid-cols-3 gap-4 p-5 h-[19rem] text-left">
        <div className="col-span-2">
          <object
            data={file}
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
            <div className="flex flex-col">
              {showRank && (
                <div className="mb-3">
                  <div className="text-primary">
                    {" "}
                    <b>Rank:</b> 2{" "}
                  </div>
                  <div className="text-primary">
                    {" "}
                    <b>Score:</b> 98.45%{" "}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col mt3 truncate text-align-left">
              <div className="text-primary">
                {" "}
                <b>Name: </b> Ethan Rong
              </div>
              <div className="text-primary">
                {" "}
                <b>Best Fit:</b> Quality Assurance Engineer{" "}
              </div>
              <div className="text-primary">
                {" "}
                <b>Email:</b> ethan.rong@gmail.com{" "}
              </div>
              <div className="text-primary">
                {" "}
                <b>Phone:</b> 647-779-9806{" "}
              </div>
            </div>

            <div className="flex flex-col mt-3">
              <div className="text-secondary">
                <b>Summary of Qualifications: </b>
                <div className="line-clamp-6 text-justify text-black">
                  {summary}
                </div>
              </div>
              <div className="mt-3 flex flex-row">
                <div className="text-secondary">
                  <b>Options:</b>
                </div>
                <div className="flex justify-end ml-auto">
                  {like ? (
                    <FaHeart
                      style={{ color: "red" }}
                      className="mr-3"
                      onClick={console.log("hi")}
                    />
                  ) : (
                    <FaHeart
                      style={{ color: "gray" }}
                      className="mr-3"
                      onClick={console.log("hi")}
                    />
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
              <h2 className="text-secondary">Summary of {name}'s Qualifications</h2>
              <div className="flex ml-auto">
                <FaTimes 
                  className="text-red-500 text-2xl cursor-pointer mt-4" 
                  onClick={() => (setNote(!note))}
                />
              </div>
            </div>
            <p> {summary} </p>
          </div>
        )}
        {note && (
          <div className="content pl-5 pr-5 pb-8 text-left animate-slideleft">
            <div className="flex flex-row">
              <h2 className="text-secondary">Notes on {name}'s Profile</h2>
              <div className="flex ml-auto">
                <FaTimes 
                  className="text-red-500 text-2xl cursor-pointer mt-4" 
                  onClick={() => (setNote(!note))}
                />
              </div>
            </div>
            <textarea
              type="text"
              className="w-full h-32"
              maxLength="1000"
            />
            <div className="flex justify-center">
              <button 
                className="pb-3 pt-3 mt-4 w-full rounded-lg"
                value={"aksdfhasdl;k"}
                onClick={console.log("hii")}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default ResumeCard;
