import React from 'react';
import './InputField.css';

const InputField = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  disabled = false,
  autoComplete = 'off',
  className,
  icon,
  onIconClick,
}) => {
  return (
    <div className="input-wrapper">
      <input
        className={`input-field ${className || ''}`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete={autoComplete}
      />
      {icon && (
        <div className="icon-wrapper" onClick={onIconClick}>
          {icon}
        </div>
      )}
    </div>
  );
};

export default InputField;
