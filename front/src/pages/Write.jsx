import React from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from '../assets/back.png';
import './Write.css';
import '../index.css';
import './Home';
import Button from '../components/Button';

const Write = () => {
  const navigate = useNavigate();
  const handleDone = () => {
    navigate('/home');
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
          <input type="text" placeholder="제목을 입력하세요."></input>
          <hr />
        </div>
        <div className="input-group">
          <label htmlFor="date-time-local">날짜</label>
          <input type="date"></input>
        </div>
        <div className="input-group">
          <label htmlFor="time">시간</label>
          <input type="time"></input>
        </div>
        <div className="input-group">
          <label htmlFor="place">장소</label>
          <input type="text" placeholder="장소를 입력해주세요"></input>
        </div>
        <div className="input-group">
          <label htmlFor="contents">내용</label>
          <textarea
            placeholder="
            내용을 입력해주세요.
            예: 대화 없이 조용히 밥만 먹어요."
            rows={6}
          />

          <p className="rules">
            UniVap은 모두가 즐겁고 안전하게 사용할 수 있는 공간입니다. <br />
            <br />
            다음 규칙을 꼭 지켜주세요. <br />• 존중하는 언어를 사용해주세요.
            (비방/욕설/혐오 금지)
            <br /> • 밥 메이트 관련 글만 작성해주세요.
            <br /> • 광고, 홍보, 불법/성적 내용은 금지입니다. • 시간, 장소 등
            정보를 정확히 입력해주세요.
            <br /> • 규칙 위반 시 글 삭제 및 이용 제한 조치가 있을 수 있습니다.
            <br />
            <br /> 함께 안전한 UniVap을 만들어가요!
          </p>
        </div>
      </section>
      <Button label="작성완료" onClick={handleDone} variant="primary" />
    </div>
  );
};

export default Write;
