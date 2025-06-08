import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';
import '../index.css';
import FloatingActionButton from '../components/FloatingActionButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [nickname, setNickname] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();
  const handleFabClick = () => {
    navigate('/write');
  };

  useEffect(() => {
    const storedNickname = localStorage.getItem('nickname');
    if (!storedNickname) {
      alert('로그인이 필요합니다.');
      window.location.href = '/login';
      return;
    }
    setNickname(storedNickname);
  }, [navigate]);

  useEffect(() => {
    // ✅ 게시글 목록 불러오기
    axios
      .get(`${API_URL}/api/post/list`)
      .then((res) => {
        console.log('불러온 게시글 데이터:', res.data);
        setPosts(res.data);
      })
      .catch((err) => console.error('게시글을 불러오지 못했습니다.', err));
  }, []);

  return (
    <div className="page-layout">
      {/* nickname을 Header에 전달 */}
      <Header username={nickname} />

      <main className="home-content">
        <div>
          {/* 게시글 목록 렌더링 */}
          <ul className="post-list">
            {posts.map((post) => (
              <li key={post.id} className="post-item">
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
        </div>
      </main>

      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Home;
