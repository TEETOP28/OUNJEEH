import React from 'react';
import { BRAND_NAME } from '../constants';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "" }) => (
  <div className={`font-serif font-black tracking-tighter text-demmy-green flex items-baseline ${className}`}>
    <span>{BRAND_NAME}</span>
    <span className="text-demmy-gold ml-0.5">.</span>
  </div>
);
