
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick,
  href 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-300 active:scale-95 text-center tracking-tight';
  
  const variants = {
    // text-white on demmy-green, then demmy-green on demmy-light for hover
    primary: 'bg-demmy-green text-white hover:bg-demmy-light hover:text-demmy-green shadow-xl shadow-demmy-green/10',
    // text-demmy-green on demmy-gold, then white on demmy-forest for hover
    secondary: 'bg-demmy-gold text-demmy-green hover:bg-demmy-forest hover:text-white border-2 border-demmy-gold shadow-lg shadow-demmy-gold/20',
    // border and text demmy-green, then white on demmy-green for hover
    outline: 'border-2 border-demmy-green text-demmy-green hover:bg-demmy-green hover:text-white',
    // text-white on WhatsApp green, then text-white on darker green for hover
    whatsapp: 'bg-[#25D366] text-white hover:bg-[#20bd5c] hover:text-white shadow-lg shadow-green-500/20',
    // text demmy-green, subtle background on hover
    ghost: 'text-demmy-green hover:bg-demmy-green/10',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-base',
    lg: 'px-10 py-5 text-lg',
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClasses} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} onClick={onClick}>
      {children}
    </button>
  );
};
