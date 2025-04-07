import React from 'react';
import './Header.css';
import logoSpork from '../assets/logo-spork.png';

const Header = ({ username = '게스트' }) => {
  return (
    <header className="header">
      <img src={logoSpork} alt="글자없는 로고" className="no-text-logo" />
      <span>{username}님 환영합니다.</span>
    </header>
  );
};

export default Header;
