import { useNavigate } from 'react-router-dom';
import React from 'react';
import Button from '../components/Button';
import './LoginIntro.css';
import logo from '../assets/logo.png';

const LoginIntro = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="login-intro-container">
      <img src={logo} alt="Univap 로고" className="text-logo" />

      <p className="intro-text">혼밥은 이제 그만 </p>
      <p className="inro-second-text">
        <span className="highlight">UniVap</span>에서 시작하세요.
      </p>

      <Button
        label="로그인하기"
        onClick={handleLoginClick}
        variant="primary"
      ></Button>
    </div>
  );
};

export default LoginIntro;
