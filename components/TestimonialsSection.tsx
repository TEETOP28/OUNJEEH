import React from 'react';
import { TESTIMONIALS } from '../constants';
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
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-demmy-amber font-black text-xs uppercase tracking-[0.4em] mb-6 block">
            What Our Customers Say
          </span>
          <h2 className="font-serif text-5xl md:text-7xl text-demmy-green mb-8 tracking-tighter">
            Trusted by Families & Businesses
          </h2>
          <p className="text-lg md:text-xl text-slate-600 font-light">
            Real experiences from people who've made the switch to quality farm-to-table staples.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`bg-white p-10 md:p-12 rounded-[3rem] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-demmy-green/5 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
              }}
            >
              <div className="flex flex-col h-full">
                <div className="text-demmy-gold text-4xl mb-6" aria-hidden="true">★★★★★</div>
                <blockquote className="text-slate-600 text-lg leading-relaxed mb-8 flex-grow italic">
                  "{testimonial.content}"
                </blockquote>
                <div className="border-t border-demmy-green/10 pt-6">
                  <cite className="not-italic">
                    <p className="font-black text-demmy-green text-xl mb-1">
                      {testimonial.name}
                    </p>
                    <p className="text-demmy-amber font-serif text-sm">
                      {testimonial.role}
                    </p>
                  </cite>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-20 text-center">
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
