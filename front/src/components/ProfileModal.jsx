import React, { useRef, useState } from 'react';
import './ProfileModal.css';
import Button from '../components/Button';
import InputField from './InputField';

const ProfileModal = ({ onClose }) => {
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          ×
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
            className="nickname-input"
          />
        </div>

        <Button
          className="small-btn"
          label="완료"
          onClick={onClose}
          variant="primary"
        />
      </div>
    </div>
  );
};

export default ProfileModal;
