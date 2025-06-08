import React, { useRef, useState, useEffect } from 'react';
import './ProfileModal.css';
import Button from '../components/Button';
import InputField from './InputField';
import exitIcon from '../assets/exit.png';

const ProfileModal = ({ onClose, onNicknameChange, onImageChange }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [nickname, setNickname] = useState('');
  const fileInputRef = useRef(null);

  // 프로필 이미지와 닉네임 초기값 로드
  useEffect(() => {
    const email = localStorage.getItem('email');

    // 백엔드에서 프로필 이미지 로드
    if (email) {
      fetch(`http://localhost:8080/api/user/me/image/view?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.profileImage) {
            setProfileImage(data.profileImage);
          } else {
            setProfileImage('/assets/avatar.png'); // 기본 이미지
          }
        })
        .catch((err) => {
          console.error('🚨 이미지 불러오기 실패:', err);
          setProfileImage('/assets/avatar.png');
        });
    }

    // 닉네임은 여전히 로컬에서 불러옴 (원하면 서버 저장 방식으로 바꿔도 됨)
    const storedNickname = localStorage.getItem('nickname');
    if (storedNickname) setNickname(storedNickname);
  }, []);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;
        setProfileImage(base64Image); // UI 반영
        onImageChange(base64Image); // 상태 전달 (필요시)

        const email = localStorage.getItem('email');
        try {
          const response = await fetch(
            'http://localhost:8080/api/user/me/image',
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email,
                profileImage: base64Image,
              }),
            }
          );

          const result = await response.json();
          if (result.success) {
            console.log('✅ 이미지 업로드 성공');
          } else {
            console.error('❌ 업로드 실패:', result.message);
          }
        } catch (error) {
          console.error('🚨 서버 요청 실패:', error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComplete = () => {
    if (nickname.trim()) {
      onNicknameChange(nickname); // 상태 전달 (서버 저장은 따로 구현 필요)
    }
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <img src={exitIcon} alt="닫기 아이콘" />
        </button>

        <h3>프로필 수정</h3>

        <div className="profile-body">
          <img
            src={profileImage || '/assets/avatar.png'}
            alt="프로필"
            className="avatar"
            onClick={handleImageClick}
          />

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />

          <InputField
            type="text"
            placeholder="닉네임 입력"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="nickname-input"
          />
        </div>

        <Button
          className="small-btn"
          label="완료"
          onClick={handleComplete}
          variant="primary"
        />
      </div>
    </div>
  );
};

export default ProfileModal;
