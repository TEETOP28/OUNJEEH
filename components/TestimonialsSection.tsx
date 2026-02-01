import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const TestimonialsSection: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section 
      ref={elementRef}
      className={`py-32 bg-gradient-to-b from-white to-demmy-cream relative overflow-hidden transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* Trust Badge */}
        <div className="text-center">
          <div className="inline-flex items-center gap-6 bg-demmy-green text-white px-12 py-6 rounded-full shadow-2xl shadow-demmy-green/30">
            <div className="text-3xl" aria-hidden="true">✓</div>
            <div className="text-left">
              <p className="font-black text-2xl">100+ Happy Customers</p>
              <p className="text-emerald-100 text-sm">Delivering quality since 2020</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
