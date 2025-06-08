import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';
import backIcon from '../assets/back.png';
import './Write.css';
import '../index.css';
import toast from 'react-hot-toast';

const Write = () => {
  const navigate = useNavigate();

  // "id" 키로만 가져온다
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  // 첫 렌더링 때 id 값 로드
  useEffect(() => {
    const storedId = localStorage.getItem('id');
    setUserId(storedId || ''); // 없으면 빈 문자열
    console.log('id in localStorage:', storedId);
  }, []);

  const handleDone = async () => {
    if (!userId || userId === 'undefined' || userId === 'null') {
      setError('로그인이 필요합니다.');
      toast.error('로그인이 필요합니다.');
      return;
    }
    if (!title || !date || !time || !location || !content) {
      setError('모든 필드를 입력해주세요.');
      toast.error('모든 필드를 입력해주세요.');
      return;
    }
    setError('');

    try {
      const response = await axios.post(
        `http://localhost:8080/api/post/write`,
        {
          title,
          date,
          time,
          location,
          content,
          userId: Number(userId),
        }
      );

      console.log('post 작성 결과:', response.data);

      if (response.data.success) {
        toast.success('글이 작성되었습니다!');
        navigate('/home');
      } else {
        setError(response.data.message || '작성 실패');
        toast.error(response.data.message || '작성 실패');
      }
    } catch (err) {
      setError('서버 오류로 작성 실패');

      toast.error('서버 오류로 작성 실패');
    }
  };

  return (
    <div className="page-layout write">
      <section className="container">
        <img
          src={backIcon}
          alt="뒤로가기"
          className="back-button"
          onClick={() => navigate('/home')}
        />
        <div className="input-group title">
          <input
            type="text"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <hr />
        </div>
        <div className="input-group">
          <label>날짜</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>시간</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>장소</label>
          <input
            type="text"
            placeholder="장소를 입력해주세요"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>내용</label>
          <textarea
            placeholder="내용을 입력해주세요. 예: 대화 없이 조용히 밥만 먹어요."
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={1000}
            className="content-textarea"
          />
          <p className="rules">
            UniVap은 모두가 즐겁고 안전하게 사용할 수 있는 공간입니다.
            <br />
            <br />
            다음 규칙을 꼭 지켜주세요. <br />• 존중하는 언어를 사용해주세요.
            (비방/욕설/혐오 금지)
            <br /> • 밥 메이트 관련 글만 작성해주세요.
            <br /> • 광고, 홍보, 불법/성적 내용은 금지입니다. <br /> • 시간,
            장소 등 정보를 정확히 입력해주세요.
            <br /> • 규칙 위반 시 글 삭제 및 이용 제한 조치가 있을 수 있습니다.
            <br />
            <br /> 함께 안전한 UniVap을 만들어가요!
          </p>
        </div>
        {error && <div className="error-msg">{error}</div>}
      </section>
      <Button label="작성완료" onClick={handleDone} variant="primary" />
    </div>
  );
};

export default Write;
