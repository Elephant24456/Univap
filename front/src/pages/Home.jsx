import React, { useState, useEffect, use } from 'react';
import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';
import '../index.css';

import FloatingActionButton from '../pages/FloatingActionButton';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [nickname, setNickname] = useState('');
  const [activeTab, setActiveTab] = useState('home');

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

  return (
    <div className="page-layout">
      {/* nickname을 Header에 전달 */}
      <Header username={nickname} />

      <main className="home-content">
        <div>
          {/* 홈화면에 글쓰기 페이지 구현으로 인해 rab 버튼 간단하게 생성하고 글쓰기 */}
          {/* 페이지 라우터만 해놨습니다. */}
          {/* 이어서 home 작업하시면 될거같습니다. */}
          <FloatingActionButton onClick={handleFabClick} />
        </div>
      </main>

      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Home;
