import React from "react";
import "./Input.css";

interface InputProps {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ type = "text", value, onChange, placeholder = "", className = "" }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`input-field ${className}`}
    />
  );
};

export default Input;
