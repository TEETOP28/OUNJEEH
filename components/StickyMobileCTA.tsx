import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { InquiryMode } from '../types';

interface StickyMobileCTAProps {
  onOpenInquiry: (mode: InquiryMode) => void;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({ onOpenInquiry }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 p-4 glass-card border-t border-white/50 z-50 md:hidden transition-all duration-500 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
      aria-hidden={!visible}
    >
      <Button 
        variant="whatsapp" 
        className="w-full py-4 rounded-2xl flex gap-3 text-sm shadow-xl" 
        onClick={() => onOpenInquiry('inquiry')}
      >
        <span className="text-xl" aria-hidden="true">💬</span>
        Order Now on WhatsApp
      </Button>
    </div>
  );
};
