import "./App.css";
import { React, useState } from "react";
import postResume from "./APICall";

function App() {
  const [allFiles, setAllFiles] = useState([]);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setAllFiles([...allFiles, file]);
      }
    }
  };



  return (
    <div className="App">
      <input 
        type="file"
        onChange={handleFileUpload}
        multiple
      >

      </input>
      <button
        onClick={() => (postResume(allFiles[allFiles.length-1]))}
      >
        Send to API
      </button>
    </div>
  );
}

export default App;
