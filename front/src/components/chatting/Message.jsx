import React from "react";
import "./Message.css"; // CSS 파일 import

const Message = ({ text, isSender }) => {
  return (
    <div className={`message ${isSender ? "sender" : "receiver"}`}>
      <p>{text}</p>
    </div>
  );
};

export default Message;
