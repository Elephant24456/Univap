import React from "react";
import "./HeaderPostSummary.css";

const HeaderPostSummary = ({ title, content, time }) => {
  return (
    <div className="header-post-summary">
      <div className="post-title">{title}</div>
      <div className="post-content">{content}</div>
      <div className="post-time">{time}</div>
    </div>
  );
};

export default HeaderPostSummary;
