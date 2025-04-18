import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import InputField from '../components/InputField';
import logo from '../assets/logo.png';
import openEye from '../assets/open-eye.png';
import closeEye from '../assets/close-eye.png';
import backIcon from '../assets/back.png';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  // 이메일 인증
  const [authCodeSent, setAuthCodeSent] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [inputAuthCode, setInputAuthCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const handleVerifyCode = () => {
    if (inputAuthCode === authCode) {
      alert('이메일 인증 완료!');
      setIsEmailVerified(true);
    } else {
      alert('인증번호가 일치하지 않습니다.');
    }
  };

  const handleSendAuthCode = () => {
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    // 백엔드 연결 전, 임시 코드
    setAuthCodeSent(true);
    setAuthCode('123456');
    alert('임시 인증번호 "123456"이 발송되었습니다.');
  };

  const handleSignUp = () => {
    // 유효성 검사
    if (!nickname || !email || !password || !confirmPassword) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // TODO: 서버 회원가입 요청 처리 로직

    console.log('회원가입 성공!');
    navigate('/home'); // 홈 이동, 이름 변경될 수 있음
  };

  return (
    <div className="sign-up-container">
      {/* 뒤로가기 버튼 */}
      <img
        src={backIcon}
        alt="뒤로가기"
        className="back-button"
        onClick={() => navigate('/')}
      />

      {/* 로고 */}
      <img src={logo} alt="Univap 로고" className="text-logo" />
      <h2 className="sign-up-title">회원가입</h2>

      {/* 닉네임 */}
      <p>닉네임</p>
      <InputField
        label="닉네임"
        placeholder="닉네임을 입력해주세요."
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      {/* 이메일 */}

      <p>이메일</p>
      <div className="email-auth">
        <InputField
          label="이메일"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
              placeholder="인증번호를 입력해주세요."
              value={inputAuthCode}
              onChange={(e) => setInputAuthCode(e.target.value)}
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

      {/* 비밀번호 확인 */}
      <p>비밀번호 확인</p>
      <InputField
        label="비밀번호 확인"
        placeholder="비밀번호를 한번 더 입력해주세요."
        type={showPassword ? 'text' : 'password'}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
      <Button label="회원가입" onClick={handleSignUp} variant="primary" />
    </div>
  );
};

export default SignUp;
