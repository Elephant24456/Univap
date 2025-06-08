import React, { useEffect, useState } from 'react';
import Button from './Button';
import './PostDetailModal.css';

const PostDetailModal = ({ postId, onClose }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/posts/${postId}`
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
    // 여기에 채팅방 이동 로직 구현 (예: postId 기반 라우팅)
    alert('채팅방으로 이동합니다 (예: /chat/' + postId + ')');
  };

  if (loading) return <div className="detail-modal-backdrop">로딩 중...</div>;
  if (!post)
    return (
      <div className="detail-modal-backdrop">글을 불러올 수 없습니다.</div>
    );

  return (
    <div className="detail-modal-backdrop">
      <div className="detail-modal">
        <h2>{post.title}</h2>
        <div className="detail-item">
          <span className="label">작성자</span>
          <span>{post.nickname}</span>
        </div>
        <div className="detail-item">
          <span className="label">날짜</span>
          <span>{post.date}</span>
        </div>
        <div className="detail-item">
          <span className="label">시간</span>
          <span>{post.time}</span>
        </div>
        <div className="detail-item">
          <span className="label">장소</span>
          <span>{post.location}</span>
        </div>
        <div className="detail-item">
          <span className="label">내용</span>
          <p className="content-text">{post.content}</p>
        </div>

        <div className="detail-modal-btns">
          <Button
            label="취소"
            onClick={onClose}
            className="modal-btn gray-btn"
          />
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
