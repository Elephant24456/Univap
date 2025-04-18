import React from 'react';
import './Button.css';

const Button = ({
  label,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${variant} ${className}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
