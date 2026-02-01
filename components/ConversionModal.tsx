import React from 'react';
import { Button } from './Button';
import { BRAND_NAME } from '../constants';
import { InquiryMode } from '../types';

interface ConversionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: (mode: InquiryMode) => void;
}

export const ConversionModal: React.FC<ConversionModalProps> = ({ isOpen, onClose, onOpenInquiry }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="conversion-modal-title"
    >
      <div 
        className="absolute inset-0 bg-demmy-forest/90 backdrop-blur-md" 
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <div className="relative w-full max-w-4xl harvest-gradient rounded-[3rem] md:rounded-[5rem] p-10 md:p-24 text-center text-white overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.6)] border border-white/10 animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-demmy-green rounded"
          aria-label="Close modal"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" aria-hidden="true"></div>
        
        <div className="relative z-10">
          <h2 id="conversion-modal-title" className="font-serif text-4xl md:text-7xl leading-[1] mb-8 tracking-tighter">
            Pure Quality, <br/>Direct To You.
          </h2>
          <p className="text-lg md:text-xl text-emerald-100/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Stop guessing about the quality of your staples. Start ordering <span className="text-demmy-gold font-bold">{BRAND_NAME}</span> today and experience the difference of farm-to-door purity.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8">
            <Button 
              size="lg" 
              variant="secondary" 
              className="h-16 md:h-20 px-12 md:px-20 text-lg md:text-xl rounded-3xl" 
              onClick={() => { 
                onClose(); 
                onOpenInquiry('inquiry'); 
              }}
            >
              Order Now
            </Button>
            <Button 
              size="lg" 
              variant="ghost" 
              className="h-16 md:h-20 px-8 md:px-16 text-lg md:text-xl border-2 border-white/20 text-white hover:bg-white/10 rounded-3xl" 
              onClick={onClose}
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
