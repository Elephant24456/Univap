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
}) => {
  return (
    <input
      className="input-field"
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      autoComplete={autoComplete}
    />
  );
};

export default InputField;
