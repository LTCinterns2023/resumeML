import React, { useState, useEffect, useRef } from "react";
import "../App.css";

const UploadPanel = ({ files, onFileDelete }) => {
  const panelRef = useRef(null);

  // Scroll to the bottom whenever new paragraphs are added
  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollTo(0, panelRef.current.scrollHeight);
    }
  }, [files]);

  return (
    <div
      ref={panelRef} // Set the ref on the div container
      className="animate-slideleft rounded-lg scroll-box h-48 overflow-y-auto p-4 border border-gray-400 bg-gray-100 flex align-end flex-col content"
    >
      <div className="flex flex-row ">
        <h2 className="text-left text-primary font-bold">
          Displaying The Following Resumes
        </h2>
      </div>


      {files.length !== 0 &&
        files.map((fileObject, index) => {
          const file = fileObject.file;
          return (
            <div key={index}>
              {file.type !== "application/pdf" ? (
                <div className="animate-slideleft flex flex-row items-center">
                  <p className="text-red-600 font-bold mr-3">
                    Not A Valid File Type:
                  </p>
                  <p className="mr-2"> {file.name} </p>
                  <button onClick={() => onFileDelete(file)}>X</button>
                </div>
              ) : (
                <div className="animate-slideleft flex flex-row items-center">
                  <p className="text-green-700 font-bold mr-3">
                    Valid Resume:
                  </p>
                  <p className="mr-2"> {file.name} </p>
                  <button onClick={() => onFileDelete(file)}>X</button>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default UploadPanel;
