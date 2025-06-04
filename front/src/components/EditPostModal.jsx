import React, { useState, useEffect } from 'react';
import Button from './Button';
import './EditPostModal.css';

const EditPostModal = ({ post, onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title || '');
      setDate(post.date || '');
      setTime(post.time || '');
      setLocation(post.location || '');
      setContent(post.content || '');
      console.log('모달에 post:', post);
    }
  }, [post]);

  const handleSave = () => {
    if (!title || !date || !time || !location || !content) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    setError('');
    onSave({
      ...post,
      title,
      date,
      time,
      location,
      content,
    });
  };

  return (
    <div className="edit-modal-backdrop">
      <div className="edit-modal">
        <h2>글 수정</h2>
        <div className="input-group title">
          <input
            type="text"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <hr />
        </div>
        <div className="input-group">
          <label>날짜</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>시간</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>장소</label>
          <input
            type="text"
            placeholder="장소를 입력해주세요"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>내용</label>
          <textarea
            placeholder="내용을 입력해주세요. 예: 대화 없이 조용히 밥만 먹어요."
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        {error && <div className="error-msg">{error}</div>}
        <div className="edit-modal-btns">
          <Button
            label="취소"
            onClick={onClose}
            className="modal-btn gray-btn"
          />
          <Button
            label="저장"
            onClick={handleSave}
            variant="primary"
            className="modal-btn"
          />
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
