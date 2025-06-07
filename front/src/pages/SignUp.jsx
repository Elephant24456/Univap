import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import InputField from '../components/InputField';
import logo from '../assets/logo-spork.png';
import openEye from '../assets/open-eye.png';
import closeEye from '../assets/close-eye.png';
import backIcon from '../assets/back.png';
import './SignUp.css';
import '../index.css';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [univ, setUniv] = useState(''); // ✅ 대학교명 state 추가

  const [authCodeSent, setAuthCodeSent] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [inputAuthCode, setInputAuthCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const handleVerifyCode = async () => {
    if (!email || !inputAuthCode) {
      alert('이메일과 인증번호를 모두 입력해주세요.');
      return;
    }

    if (!univ) {
      alert('대학교명을 먼저 입력해주세요.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/api/univ/verify', {
        email,
        univName: univ,
        code: inputAuthCode,
      });

      if (res.data.includes('이메일 인증 성공')) {
        alert('이메일 인증 완료!');
        setIsEmailVerified(true);
      } else {
        alert('인증 실패: ' + res.data);
      }
    } catch (error) {
      alert('인증 실패: ' + (error.response?.data || error.message));
    }
  };

  const handleSendAuthCode = async () => {
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    if (!univ) {
      alert('대학교명을 입력해주세요.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/api/univ/request', {
        email,
        univName: univ, // ← 수정
      });

      alert(res.data);
      setAuthCodeSent(true);
    } catch (error) {
      if (error.response) {
        const message =
          typeof error.response.data === 'string'
            ? error.response.data
            : error.response.data.message ||
              JSON.stringify(error.response.data);
        alert(message);
      } else {
        alert('요청 중 오류 발생: ' + error.message);
      }
    }
  };

  const handleSignUp = async () => {
    if (!nickname || !email || !password || !confirmPassword || !univ) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/api/user/signup', {
        email,
        password,
        nickname,
        univ, // ✅ 대학교명 추가
      });

      alert(res.data); // ex) "회원가입 성공"
      navigate('/home');
    } catch (error) {
      alert('회원가입 실패: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="page-layout sign-up-container">
      <img
        src={backIcon}
        alt="뒤로가기"
        className="back-button"
        onClick={() => navigate('/')}
      />
      <img src={logo} alt="Univap 로고" className="logo" />
      <h2 className="sign-up-title">회원가입</h2>

      <p>닉네임</p>
      <InputField
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="닉네임"
      />

      <p>대학교명</p>
      <InputField
        value={univ}
        onChange={(e) => setUniv(e.target.value)}
        placeholder="대학교명"
      />

      <p>이메일</p>
      <div className="email-auth">
        <InputField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
        />
        <Button
          label="인증요청"
          onClick={handleSendAuthCode}
          variant="secondary"
          className="num-check"
        />
      </div>

      {authCodeSent && !isEmailVerified && (
        <>
          <p>인증번호 입력</p>
          <div className="email-auth">
            <InputField
              value={inputAuthCode}
              onChange={(e) => setInputAuthCode(e.target.value)}
              placeholder="인증번호"
            />
            <Button
              label="확인"
              onClick={handleVerifyCode}
              variant="secondary"
              className="num-check"
            />
          </div>
        </>
      )}

      <p>비밀번호</p>
      <InputField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        type={showPassword ? 'text' : 'password'}
        icon={
          <img
            src={showPassword ? closeEye : openEye}
            alt="비밀번호 보기"
            className="password-toggle-icon"
          />
        }
        onIconClick={() => setShowPassword((prev) => !prev)}
      />

      <p>비밀번호 확인</p>
      <InputField
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호 확인"
        type={showPassword ? 'text' : 'password'}
        icon={
          <img
            src={showPassword ? closeEye : openEye}
            alt="비밀번호 보기"
            className="password-toggle-icon"
          />
        }
        onIconClick={() => setShowPassword((prev) => !prev)}
      />

      <Button label="회원가입" onClick={handleSignUp} variant="primary" />
    </div>
  );
};

export default SignUp;
