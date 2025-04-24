import React from 'react';
import './BottomNavBar.css';
import homeGray from '../assets/home-gray.png';
import homeOrange from '../assets/home-orange.png';
import chatGray from '../assets/chat-gray.png';
import chatOrange from '../assets/chat-orange.png';
import profileGray from '../assets/profile-gray.png';
import profileOrange from '../assets/profile-orange.png';
import { useNavigate } from 'react-router-dom';

const BottomNavBar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  return (
    <nav className="bottom-nav">
      <button
        className={activeTab === 'home' ? 'active' : ''}
        onClick={() => {
          setActiveTab('home');
          navigate('/home');
        }}
      >
        <img
          src={activeTab === 'home' ? homeOrange : homeGray}
          alt="홈"
          className="nav-icon"
        />
        <span>홈</span>
      </button>

      <button
        className={activeTab === 'chat' ? 'active' : ''}
        onClick={() => {
          setActiveTab('chat');
          navigate('/chat');
        }}
      >
        <img
          src={activeTab === 'chat' ? chatOrange : chatGray}
          alt="채팅"
          className="nav-icon"
        />
        <span>채팅</span>
      </button>

      <button
        className={activeTab === 'mypage' ? 'active' : ''}
        onClick={() => {
          setActiveTab('mypage');
          navigate('/myPage');
        }}
      >
        <img
          src={activeTab === 'mypage' ? profileOrange : profileGray}
          alt="마이페이지"
          className="nav-icon"
        />
        <span>마이페이지</span>
      </button>
    </nav>
  );
};

export default BottomNavBar;

/**
App.js 사용시 입력
const [activeTab, setActiveTab] = useState('home');
.
.
.
<BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab}
*/
