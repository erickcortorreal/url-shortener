import React from "react";
import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className = "", disabled = false }) => {
  return (
    <button className={`button ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
