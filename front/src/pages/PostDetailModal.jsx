import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "./PostDetailModal.css";

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
        if (!response.ok) throw new Error("게시글 조회 실패");
        const data = await response.json();
        setPost(data);

        console.log("Fetched post data:", data); // 이 부분 추가!
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (postId) fetchPost();
  }, [postId]);

  const handleChat = async () => {
    console.log("post in handleChat:", post); // 여기 추가
    console.log("post.userId in handleChat:", post?.userId); // 여기 추가
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (
        !storedUser ||
        !storedUser.id ||
        !storedUser.nickname ||
        !storedUser.email
      ) {
        console.error("로그인 정보가 없습니다.");
        alert("로그인이 필요합니다.");
        return;
      }

      const user = {
        id: storedUser.id,
        nickname: storedUser.nickname,
        email: storedUser.email,
      };

      if (!post || !post.userId) {
        console.error("작성자 정보가 없습니다.");
        alert("채팅 상대 정보를 불러올 수 없습니다.");
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/chatroom/create?user1Id=${user.id}&user2Id=${post.userId}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) throw new Error("채팅방 생성 실패");

      const { id: chatRoomId } = await response.json();
      navigate(`/chatting/${chatRoomId}`);
    } catch (err) {
      console.error(err.message);
    }
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
            label="취소하기"
            onClick={onClose}
            className="modal-btn gray-btn"
          />
          <Button
            label="채팅으로 가기"
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
