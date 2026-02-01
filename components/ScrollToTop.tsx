import React, { useState, useEffect } from 'react';

export const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 800);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      onClick={scrollToTop}
      className={`fixed right-6 bottom-24 md:bottom-12 z-40 p-4 bg-demmy-green text-white rounded-2xl shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 transform focus:outline-none focus:ring-2 focus:ring-demmy-green focus:ring-offset-2 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};
