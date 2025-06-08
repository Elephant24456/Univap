import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import InputField from '../components/InputField';
import logo from '../assets/logo-spork.png';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import { GrPrevious } from 'react-icons/gr';
import './SignUp.css';
import '../index.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const SignUp = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [univ, setUniv] = useState(''); // ✅ 대학교명 state 추가
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isDuplicateNickname, setIsDuplicateNickname] = useState(null); // true/false/null
  const [showNicknameMessage, setShowNicknameMessage] = useState(true);

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
        toast.success('이메일 인증 완료!');
        setIsEmailVerified(true);
      } else {
        toast.error('인증 실패: ' + res.data);
      }
    } catch (error) {
      alert('인증 실패: ' + (error.response?.data || error.message));
    }
  };

  const handleSendAuthCode = async () => {
    if (!email) {
      toast.error('이메일을 입력해주세요.');
      return;
    }

    if (!univ) {
      toast.error('대학교명을 입력해주세요.');
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
      toast.error('모든 항목을 입력해주세요.');
      return;
    }

    if (!isNicknameChecked) {
      toast.error('닉네임 중복 확인을 해주세요.');
      return;
    }

    if (isDuplicateNickname) {
      toast.error('이미 사용 중인 닉네임입니다.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/api/user/signup', {
        email,
        password,
        nickname,
        univ,
      });

      alert(res.data); // ex) "회원가입 성공"
      navigate('/home');
    } catch (error) {
      toast.error('회원가입 실패: ' + (error.response?.data || error.message));
    }
  };

  const handleCheckNickname = async () => {
    if (!nickname) {
      toast.error('닉네임을 입력해주세요.');
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8080/api/user/check-nickname?nickname=${encodeURIComponent(
          nickname
        )}`
      );
      setIsDuplicateNickname(res.data.exists); // true면 중복
      setIsNicknameChecked(true);
      setShowNicknameMessage(true); // 메시지 보여줌

      // 3초 후 메시지 사라지게
      setTimeout(() => setShowNicknameMessage(false), 2000);
    } catch (error) {
      toast.error('중복 확인 중 오류 발생: ' + error.message);
    }
  };

  return (
    <div className="page-layout sign-up-container">
      {/* 뒤로가기 버튼 */}
      <GrPrevious
        alt="뒤로가기"
        className="back-button"
        onClick={() => navigate('/')}
      />
      <img src={logo} alt="Univap 로고" className="logo" />
      <h2 className="sign-up-title">회원가입</h2>

      <p>닉네임</p>
      <div className="signup-auth">
        <InputField
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
            setIsNicknameChecked(false); // 다시 입력하면 검사 상태 초기화
          }}
          placeholder="닉네임"
        />
        <Button
          label="중복 확인"
          onClick={handleCheckNickname}
          variant="secondary"
          className="input-check"
        />
      </div>
      {isNicknameChecked &&
        showNicknameMessage &&
        isDuplicateNickname === false && (
          <p className="success-message">사용 가능한 닉네임입니다</p>
        )}
      {isNicknameChecked &&
        showNicknameMessage &&
        isDuplicateNickname === true && (
          <p className="error-message">이미 사용 중인 닉네임입니다</p>
        )}

      <p>대학교명</p>
      <InputField
        value={univ}
        onChange={(e) => setUniv(e.target.value)}
        placeholder="대학교명"
      />

      <p>이메일</p>
      <div className="signup-auth">
        <InputField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
        />
        <Button
          label="인증요청"
          onClick={handleSendAuthCode}
          variant="secondary"
          className="input-check"
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
          showPassword ? (
            <FaRegEyeSlash className="password-toggle-icon" />
          ) : (
            <FaRegEye className="password-toggle-icon" />
          )
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
          showPassword ? (
            <FaRegEyeSlash className="password-toggle-icon" />
          ) : (
            <FaRegEye className="password-toggle-icon" />
          )
        }
        onIconClick={() => setShowPassword((prev) => !prev)}
      />

      <Button
        label="회원가입"
        onClick={handleSignUp}
        variant="primary"
        disabled={!isNicknameChecked || isDuplicateNickname}
      />
    </div>
  );
};

export default SignUp;
