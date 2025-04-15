import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import InputField from '../components/InputField';
import logo from '../assets/logo.png';
import openEye from '../assets/open-eye.png';
import closeEye from '../assets/close-eye.png';
import backIcon from '../assets/back.png';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log('로그인 시도: ', email, password);
    // TODO: 로그인 로직 추가
  };

  return (
    <div className="login-container">
      {/* 뒤로가기 버튼 */}
      <img
        src={backIcon}
        alt="뒤로가기"
        className="back-button"
        onClick={() => navigate('/')}
      />

      {/* 로고 */}
      <img src={logo} alt="Univap 로고" className="text-logo" />
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
          <img
            src={showPassword ? closeEye : openEye}
            alt="비밀번호 보기"
            className="password-toggle-icon"
          />
        }
        onIconClick={() => setShowPassword((prev) => !prev)}
      />

      {/* 로그인 */}
      <Button label="로그인" onClick={handleLogin} variant="primary" />

      {/* 회원가입 */}
      <p>
        {/* TODO:회원가입 navigate추가하기 */}
        계정이 없으신가요?{' '}
        <span onClick={() => navigate('/signup')}>회원가입</span>
      </p>
    </div>
  );
};

export default Login;
