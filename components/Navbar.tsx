import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Button } from './Button';
import { InquiryMode } from '../types';

interface NavbarProps {
  onOpenInquiry: (mode: InquiryMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Why Us', href: '#why' },
    { name: 'Quality', href: '#quality' },
    { name: 'Market', href: '#catalog' },
    { name: 'Solutions', href: '#solutions' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
        isScrolled ? 'py-4 bg-white/80 backdrop-blur-xl shadow-lg border-b border-demmy-green/5' : 'py-8 bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#" className="relative z-10 focus:outline-none focus:ring-2 focus:ring-demmy-green focus:ring-offset-2 rounded">
          <Logo className="text-3xl" />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-bold text-demmy-forest/60 hover:text-demmy-green transition-colors tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-demmy-green focus:ring-offset-2 rounded px-2 py-1"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="primary" 
            size="sm" 
            className="hidden sm:flex rounded-xl text-xs py-3 px-6"
            onClick={() => onOpenInquiry('inquiry')}
          >
            Get Inquiry
          </Button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-demmy-green focus:outline-none focus:ring-2 focus:ring-demmy-green focus:ring-offset-2 rounded"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-50 md:hidden transition-all duration-500 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col h-full p-12">
          <div className="flex justify-between items-center mb-16">
            <Logo className="text-4xl" />
            <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="p-2 text-demmy-green focus:outline-none focus:ring-2 focus:ring-demmy-green focus:ring-offset-2 rounded"
              aria-label="Close menu"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-10" aria-label="Mobile navigation">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-4xl font-serif font-black text-demmy-green hover:text-demmy-amber transition-colors focus:outline-none focus:ring-2 focus:ring-demmy-green focus:ring-offset-2 rounded px-2"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-4">
            <Button 
              variant="primary" 
              className="w-full py-6 text-xl rounded-3xl" 
              onClick={() => { 
                setIsMobileMenuOpen(false); 
                onOpenInquiry('inquiry'); 
              }}
            >
              Get Inquiry
            </Button>
            <Button 
              variant="whatsapp" 
              className="w-full py-6 text-xl rounded-3xl" 
              onClick={() => { 
                setIsMobileMenuOpen(false); 
                onOpenInquiry('inquiry'); 
              }}
            >
              Chat with Sales
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
