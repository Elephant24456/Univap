import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import InputField from '../components/InputField';
import './Login.css';
import '../index.css';
import logo from '../assets/logo-spork.png';

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import backIcon from '../assets/back.png';
import toast from 'react-hot-toast';

const Login = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log('login success', result);

        // 닉네임 로컬스토리지에 저장해서 다른 페이지에서 사용
        localStorage.setItem('id', result.id);
        localStorage.setItem('nickname', result.nickname);
        localStorage.setItem('email', email);

        navigate('/home');
      } else {
        toast.error('로그인 실패: ' + result.message);
      }
    } catch (error) {
      console.error('🚨 서버 연결 실패:', error);
      alert('서버와 연결할 수 없습니다.');
    }
  };

  return (
    <div className="page-layout login-container">
      {/* 뒤로가기 버튼 */}
      <img
        src={backIcon}
        alt="뒤로가기"
        className="back-button"
        onClick={() => navigate('/')}
      />
      {/* 로고 */}
      <img src={logo} alt="Univap 로고" className="logo" />
      <h2 className="login-title">로그인</h2>
      {/* 이메일 */}
      <p>이메일</p>
      <InputField
        label="이메일"
        placeholder="이메일을 입력해주세요."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* 비밀번호 */}
      <p>비밀번호</p>
      <InputField
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={
          showPassword ? (
            <FaRegEyeSlash className="password-toggle-icon" />
          ) : (
            <FaRegEye className="password-toggle-icon" />
          )
        }
        onIconClick={() => setShowPassword((prev) => !prev)}
      />

      {/* 로그인 */}
      <Button label="로그인" onClick={handleLogin} variant="primary" />
      {/* 회원가입 */}
      <p>
        계정이 없으신가요?
        <span onClick={() => navigate('/signup')}>회원가입</span>
      </p>
    </div>
  );
};

export default Login;
