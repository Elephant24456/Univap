import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeaderUserName.css";

const HeaderUserName = ({ title }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/chatlist"); // ChatList.jsx 페이지로 이동
  };

  return (
    <div className="chat-header">
      <button onClick={handleBackClick} className="back-button arrow"></button>
      <span>{title}</span>
    </div>
  );
};

export default HeaderUserName;
