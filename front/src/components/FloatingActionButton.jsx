import React from "react";
import fab from "../assets/fab.png";
import "./FloatingActionButton.css";

const FloatingActionButton = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick} className="fab-button">
        <img src={fab} alt="글쓰기버튼" className="fab-icon" />
      </button>
    </div>
  );
};

export default FloatingActionButton;
