import React, { useState } from "react";
import "./MessageInput.css";

const MessageInput = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      // 입력값이 공백이 아닌 경우에만 전송
      onSend(input);
      setInput(""); // 입력 필드 비우기
    }
  };

  // 키보드 입력 처리 함수
  const handleKeyDown = (event) => {
    // Enter 키(key === 'Enter')를 눌렀을 때
    // Shift + Enter를 누르면 줄바꿈이 되도록 조건 추가 (텍스트에어리어에서 일반적인 동작)
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // 기본 동작 방지 (폼 제출 등)
      handleSend(); // 메시지 전송 함수 호출
    }
    // Shift + Enter의 경우 기본 줄바꿈 동작을 허용
  };

  return (
    <div className="message-input">
      {/* <input> 대신 <textarea> 사용 */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown} // onKeyDown 이벤트 핸들러 유지
        rows="1" // 초기 높이를 1줄로 설정. 내용에 따라 자동으로 늘어납니다 (CSS 설정 필요).
      />
      <button onClick={handleSend}>전</button> {/* 버튼 클릭 시에도 전송 */}
    </div>
  );
};

export default MessageInput;
