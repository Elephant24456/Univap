import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";
import FloatingActionButton from "../components/FloatingActionButton";
import PostDetailModal from "./PostDetailModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";
import "./Home.css";

import toast, { Toaster } from 'react-hot-toast';

const Home = () => {
  const [nickname, setNickname] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null); // 모달용 상태

  const navigate = useNavigate();

  const handleFabClick = () => {
    navigate("/write");
  };

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (!userJson) {
      toast.error('로그인이 필요합니다.');
      window.location.href = '/login';
      
      return;
    }
    try {
      const user = JSON.parse(userJson);
      if (!user.nickname) throw new Error("닉네임 정보 없음");
      setNickname(user.nickname);
    } catch {
      alert("로그인 정보가 올바르지 않습니다.");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/post/list")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.error("게시글을 불러오지 못했습니다.", err));
  }, []);

  return (
    <div className="page-layout">
      <Header username={nickname} />

      <main className="home-content">
        <ul className="post-list">
          {posts.map((post) => (
            <li
              key={post.id}
              className="post-item"
              onClick={() => setSelectedPostId(post.id)} // 클릭 시 모달 열기
              style={{ cursor: "pointer" }}
            >
              <strong className="post-title">{post.title}</strong>
              <div className="post-meta">
                <span className="post-date">{post.date}</span>
                <span className="post-nickname">{post.nickname}</span>
              </div>
              <p className="post-content">{post.content}</p>
            </li>
          ))}
        </ul>

        <FloatingActionButton onClick={handleFabClick} />
      </main>

      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* selectedPostId가 있으면 모달 띄우기 */}
      {selectedPostId && (
        <PostDetailModal
          postId={selectedPostId}
          onClose={() => setSelectedPostId(null)} // 모달 닫기
        />
      )}
    </div>
  );
};

export default Home;
