import React, { useState } from 'react';
import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';
import './Home.css';
const Home = () => {
  const [activeTab, setActiveTab] = useState('home');
  return (
    <div className="home">
      <Header username="독수리" />

      <main className="home-content">
        {activeTab === 'home' && <div>홈 화면입니다.</div>}
        {activeTab === 'chat' && <div>채팅 화면입니다.</div>}
        {activeTab === 'mypage' && <div>마이페이지 화면입니다.</div>}
      </main>

      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Home;
