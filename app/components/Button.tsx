import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ children, variant, className, ...props }) => {
  const baseClasses = "px-6 py-3 rounded-full font-bold uppercase tracking-wider transition-transform transform hover:scale-105 shadow-lg";
  const variantClasses = variant === 'primary'
    ? "bg-yellow-400 text-emerald-900 hover:bg-yellow-300"
    : "bg-transparent border-2 border-white text-white hover:bg-white hover:text-emerald-900";

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};
