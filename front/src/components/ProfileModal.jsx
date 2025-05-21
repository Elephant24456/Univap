import React, { useRef, useState, useEffect } from 'react';
import './ProfileModal.css';
import Button from '../components/Button';
import InputField from './InputField';
import exitIcon from '../assets/exit.png';

const ProfileModal = ({ onClose, onNicknameChange, onImageChange }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [nickname, setNickname] = useState('');
  const fileInputRef = useRef(null);

  // 기존 닉네임을 불러와서 초기값으로 설정
  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) setProfileImage(savedImage);
    const storedNickname = localStorage.getItem('nickname');
    if (storedNickname) setNickname(storedNickname);
  }, []);

  // 기존 프로필 이미지를 불러와서 초기값으로 설정
  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) setProfileImage(savedImage);
  }, []);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setProfileImage(base64);
        localStorage.setItem('profileImage', base64);
        onImageChange(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComplete = () => {
    if (nickname.trim()) {
      localStorage.setItem('nickname', nickname);
      onNicknameChange(nickname);
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
