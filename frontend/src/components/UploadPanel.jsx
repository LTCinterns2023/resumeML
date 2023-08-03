import React, { useState, useEffect } from "react";
import "../App.css";

const isPathValid = (checkPath) => {
  const filePathRegex =
    /^\/?(([a-zA-Z]:\\|\/)?([^\0<>:"/\\|?*\n\r]+(\\|\/)?)*)$/;
  return filePathRegex.test(checkPath);
};

const UploadPanel = (props) => {
  const [numPaths, setNumPaths] = useState(0);
  useEffect(() => {}, [props.paths]);

  if (props.paths.length === 0) {
    return <></>;
  } else {
    return (
      <div
        style={{ backgroundColor: "#F5F5F5" }}
        className="animate-slideleft rounded-lg scroll-box h-48 overflow-y-auto p-4 border border-gray-400 bg-gray-100 flex align-end flex-col content"
      >
        <h2 className="text-left text-primary font-bold">
          Displaying Resumes From The Following Locations
        </h2>
        {props.paths.map((path, index) => {
          return (
            <div>
              {isPathValid(path) ? (
                <div className="animate-slideleft flex flex-row items-center">
                  <p className="text-red-600 font-bold">Not A Valid Path Name: </p>
                  <p> {path} </p>
                  <button>X</button>
                </div>
              ) : (
                <p className="text-white-700">Valid Path Name</p>
              )}
            </div>
          );
        })}
      </div>
    );
  }
};

export default UploadPanel;
