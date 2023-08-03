import React from "react";
import "../App.css";

export function KeywordBubble({
  keyword,
  index,
  deleteKeyword,
  keywords,
  setKeywords,
}) {
  return (
    <div className="keyword-bubble-container">
      {keywords.map((keyword, index) => (
        <div key={index} className="keyword-bubble">
          {keyword}
          <button
            onClick={() => deleteKeyword(keyword, keywords, setKeywords)}
            className="keyword-delete-button"
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}
