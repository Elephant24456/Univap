import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import exitIcon from '../assets/exit.png'; // 경로 확인
import './PostDetailModal.css';

const PostDetailModal = ({ postId, onClose }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/post/${postId}`
        );
        if (!response.ok) throw new Error('게시글 조회 실패');
        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (postId) fetchPost();
  }, [postId]);

  const handleChat = () => {
    navigate(`/chat/${postId}`);
  };

  if (loading) return <div className="detail-modal-backdrop">로딩 중...</div>;
  if (!post)
    return (
      <div className="detail-modal-backdrop">글을 불러올 수 없습니다.</div>
    );

  return (
    <div className="detail-modal-backdrop">
      <div className="detail-modal">
        <div className="modal-header">
          <span className="modal-title">상세보기</span>
          <img
            src={exitIcon}
            alt="닫기"
            className="exit-icon"
            onClick={onClose}
          />
        </div>
        <h2 className="modal-title-text">{post.title}</h2>
        <div className="detail-item">
          <span className="label">약속 날짜</span>
          <span className="label-info">{post.date}</span>
        </div>
        <div className="detail-item">
          <span className="label">약속 시간</span>
          <span className="label-info">{post.time}</span>
        </div>
        <div className="detail-item">
          <span className="label">약속 장소</span>
          <span className="label-info">{post.location}</span>
        </div>
        <div className="detail-item">
          <span className="label">내용</span>
          <p className="content-text">{post.content}</p>
        </div>
        <div className="detail-modal-btns">
          <Button
            label="채팅"
            onClick={handleChat}
            variant="primary"
            className="modal-btn"
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;
