import React, { useState, useEffect } from 'react';
import { CATEGORIES, PRODUCTS, SERVING_BLOCKS, BRAND_NAME, PARENT_COMPANY } from './constants';
import { CategoryId, InquiryMode } from './types';
import { Button } from './components/Button';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { ConversionModal } from './components/ConversionModal';
import { InquiryModal } from './components/InquiryModal';
import { StickyMobileCTA } from './components/StickyMobileCTA';
import { ScrollToTop } from './components/ScrollToTop';
import { TestimonialsSection } from './components/TestimonialsSection';
import { OptimizedImage } from './components/OptimizedImage';
import { Logo } from './components/Logo';
import { useScrollAnimation } from './hooks/useScrollAnimation';

// Animated Section Wrapper Component
const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = '', id }) => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });
  
  return (
    <section
      ref={elementRef}
      id={id}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </section>
  );
};


export default function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryMode, setInquiryMode] = useState<InquiryMode>('inquiry');
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>();
  const [hasTriggered, setHasTriggered] = useState(false);

  const filteredProducts = activeCategory === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory);

  const handleOpenInquiry = (mode: InquiryMode, productName?: string) => {
    setInquiryMode(mode);
    setSelectedProduct(productName);
    setIsInquiryModalOpen(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasTriggered) {
        setIsModalOpen(true);
        setHasTriggered(true);
      }
    }, 15000);

    const handleScroll = () => {
      const scrolled = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 300;
      if (scrolled >= threshold && !hasTriggered) {
        setIsModalOpen(true);
        setHasTriggered(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasTriggered]);

  return (
    <ErrorBoundary>
      <div className="bg-demmy-cream min-h-screen relative overflow-x-hidden selection:bg-demmy-gold selection:text-demmy-green">
        <div className="absolute inset-0 ounjeeh-pattern pointer-events-none"></div>
      
      <Navbar onOpenInquiry={handleOpenInquiry} />
      <ConversionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onOpenInquiry={handleOpenInquiry} />
      <InquiryModal 
        isOpen={isInquiryModalOpen} 
        onClose={() => setIsInquiryModalOpen(false)} 
        mode={inquiryMode}
        productName={selectedProduct}
      />
      
      <StickyMobileCTA onOpenInquiry={handleOpenInquiry} />
      <ScrollToTop />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-48 pb-40 overflow-hidden">
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full -z-10">
          <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-demmy-cream via-demmy-cream/20 to-transparent z-10 pointer-events-none"></div>
          <OptimizedImage 
            src="https://images.unsplash.com/photo-1543083477-4f7fe0da244d?auto=format&fit=crop&q=80&w=2000" 
            alt="Authentic Nigerian Staples" 
            className="w-full h-full grayscale-[2%] hover:grayscale-0 transition-all duration-1000"
            loading="eager"
          />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-demmy-green text-demmy-gold rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-12 shadow-xl shadow-demmy-green/30">
              <span className="w-2 h-2 bg-demmy-gold rounded-full animate-pulse"></span>
              {PARENT_COMPANY}
            </div>
            
            <Logo className="text-7xl md:text-9xl lg:text-[12rem] leading-[0.8] mb-12" />
            
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-demmy-forest mb-8 leading-tight max-w-2xl">
              Authentic Produce. <br/> 
              <span className="text-demmy-amber">Tested for Purity.</span>
            </h2>
            
            <p className="text-lg md:text-xl text-slate-700 mb-14 max-w-lg leading-relaxed font-medium">
              Discover the gold standard of Nigerian food staples. Cleaned, sorted, and delivered with the integrity of direct farm-to-door supply.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
              <Button size="lg" variant="primary" className="group h-16 px-10 text-lg shadow-2xl shadow-demmy-green/40" href="#catalog">
                Shop Our Staples
                <svg className="w-5 h-5 ml-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </Button>
              <Button size="lg" variant="secondary" className="h-16 px-10 text-lg border-2 border-demmy-gold bg-transparent hover:bg-demmy-gold transition-colors" onClick={() => handleOpenInquiry('inquiry')}>
                Supply Inquiry
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why OUNJEEH Section - USPs */}
      <AnimatedSection id="why" className="py-32 bg-demmy-cream relative z-20 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-demmy-amber font-black text-xs uppercase tracking-[0.4em] mb-6 block">Our Core Values</span>
            <h2 className="font-serif text-5xl md:text-7xl text-demmy-green mb-8 tracking-tighter">Why {BRAND_NAME}?</h2>
            <p className="text-lg md:text-xl text-slate-600 font-light">
              We bridge the gap between Nigeria's richest harvests and your kitchen table, ensuring quality that can be traced back to the source.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🚜',
                title: 'Direct Partnerships',
                desc: 'We work directly with rural smallholder farmers, ensuring fair prices and the freshest harvests.'
              },
              {
                icon: '📍',
                title: 'Total Traceability',
                desc: 'Every bag of produce can be traced back to its origin farm, ensuring safety and accountability.'
              },
              {
                icon: '✨',
                title: 'Absolute Purity',
                desc: 'Our produce undergoes rigorous sorting and cleaning. No stones, no sand, no compromise.'
              },
              {
                icon: '🚚',
                title: '24h Fulfillment',
                desc: 'Efficient logistics ensure your kitchen never runs out of the high-quality staples you love.'
              }
            ].map((usp, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] border border-demmy-green/5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 text-center md:text-left">
                <div className="text-5xl mb-8 inline-block">{usp.icon}</div>
                <h3 className="text-2xl font-serif font-black text-demmy-green mb-4">{usp.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{usp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Quality Manifesto */}
      <AnimatedSection id="quality" className="py-24 md:py-48 bg-white rounded-[3rem] md:rounded-[6rem] relative z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
            <div className="lg:col-span-7">
              <div className="max-w-3xl">
                <span className="text-demmy-amber font-black text-xs md:text-sm uppercase tracking-[0.4em] mb-6 block">The {BRAND_NAME} Standard</span>
                <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-demmy-green mb-10 leading-[1.1] tracking-tighter">Purity, <br className="hidden md:block"/>No Compromise.</h2>
                <p className="text-lg md:text-2xl text-slate-600 leading-relaxed mb-16 font-light">
                  At {PARENT_COMPANY}, we redefine trust in food sourcing. Every grain, every drop of oil is handled with absolute care to ensure a sand-free, nutrient-rich experience for your kitchen.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group p-8 md:p-10 rounded-[2.5rem] bg-demmy-light/30 border border-demmy-green/5 hover:bg-demmy-green transition-all duration-500 hover:shadow-2xl hover:shadow-demmy-green/20">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center overflow-hidden mb-8 group-hover:scale-110 transition-transform shadow-sm">
                      <img src="images/staples.png" alt="Pure Staples" className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-serif text-2xl md:text-3xl font-bold text-demmy-green group-hover:text-white mb-4">Stone-Free</h4>
                    <p className="text-slate-500 group-hover:text-emerald-50 text-base leading-relaxed">Multi-stage precision sorting ensures zero impurities in every pack.</p>
                  </div>
                  <div className="group p-8 md:p-10 rounded-[2.5rem] bg-demmy-light/30 border border-demmy-green/5 hover:bg-demmy-green transition-all duration-500 hover:shadow-2xl hover:shadow-demmy-green/20">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform shadow-sm">🍃</div>
                    <h4 className="font-serif text-2xl md:text-3xl font-bold text-demmy-green group-hover:text-white mb-4">Cold Pressed</h4>
                    <p className="text-slate-500 group-hover:text-emerald-50 text-base leading-relaxed">Traditional methods preserved to deliver pure, virgin oils with zero additives.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="relative z-10 w-full aspect-[4/5]">
                <div className="absolute top-0 right-0 w-[85%] h-[85%] rounded-[4rem] md:rounded-[5rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                  <OptimizedImage 
                    src="images/staples.png" 
                    alt="Authentic Nigerian Food Staples" 
                    className="w-full h-full"
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-[60%] h-[60%] rounded-[3rem] md:rounded-[4rem] border-[12px] md:border-[20px] border-white overflow-hidden shadow-2xl -rotate-6 hover:rotate-0 transition-transform duration-700 delay-100">
                  <OptimizedImage 
                    src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800" 
                    alt="Premium Grains" 
                    className="w-full h-full"
                  />
                </div>
                <div className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-demmy-gold text-demmy-green px-6 md:px-10 py-6 md:py-8 rounded-full shadow-2xl z-20 hidden md:block border-4 border-white">
                  <div className="text-center">
                    <span className="block font-black text-2xl md:text-3xl leading-none">100%</span>
                    <span className="block text-[10px] md:text-xs font-black uppercase tracking-widest mt-1">Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Product Catalog */}
      <AnimatedSection id="catalog" className="py-40">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-12">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="font-serif text-5xl md:text-7xl text-demmy-green mb-6 leading-tight">Harvest Market</h2>
              <p className="text-slate-500 text-lg">Direct farm-sourced items processed for pure consumption. The authentic taste of home.</p>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-6 lg:pb-0 no-scrollbar w-full lg:w-auto justify-start lg:justify-end">
              <button 
                onClick={() => setActiveCategory('all')} 
                className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${activeCategory === 'all' ? 'bg-demmy-green text-white shadow-2xl' : 'bg-white text-slate-400 hover:text-demmy-green'}`}
              >
                All Staples
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat.id} 
                  onClick={() => setActiveCategory(cat.id)} 
                  className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${activeCategory === cat.id ? 'bg-demmy-green text-white shadow-2xl' : 'bg-white text-slate-400 hover:text-demmy-green'}`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredProducts.map(product => (
              <div 
                key={product.id}
                className="group bg-white rounded-[4rem] overflow-hidden p-5 transition-all duration-500 border-2 border-transparent hover:border-demmy-gold/40 hover:scale-[1.03] hover:shadow-[0_40px_80px_rgba(10,92,54,0.1)]"
              >
                <div className="relative h-80 overflow-hidden rounded-[3rem] mb-8">
                  <OptimizedImage 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                    width={400}
                    height={320}
                  />
                  
                  {/* Hover Tooltip / Detail Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 glass-card border-none bg-white/70 backdrop-blur-md transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <p className="text-[11px] font-black text-demmy-green leading-relaxed">
                      {product.details}
                    </p>
                  </div>

                  <div className="absolute top-6 left-6 flex gap-2">
                    {product.tags.map(tag => (
                      <span key={tag} className="px-4 py-1.5 bg-demmy-green/90 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="px-6 pb-6 text-left">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-black text-demmy-green mb-1">{product.name}</h3>
                      <p className="text-demmy-amber font-serif font-black italic">{product.localName}</p>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-10 h-10 overflow-hidden line-clamp-2">{product.description}</p>
                  <Button 
                    variant="outline" 
                    className="w-full py-4 rounded-2xl group/btn !border-demmy-green !text-demmy-green hover:!bg-demmy-green hover:!text-white" 
                    onClick={() => handleOpenInquiry('order', product.name)}
                  >
                    Order on WhatsApp
                    <svg className="w-4 h-4 ml-3 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Solutions / Serving All Scales */}
      <AnimatedSection id="solutions" className="py-40 bg-demmy-green text-white relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <div className="max-w-3xl mx-auto mb-24">
            <h2 className="font-serif text-5xl md:text-7xl mb-6">Designed for Growth</h2>
            <p className="text-xl text-emerald-100/60">Reliable food supply chains for families, organizations, and businesses across Nigeria.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {SERVING_BLOCKS.map((block, idx) => (
              <div key={block.title} className={`p-16 rounded-[4rem] flex flex-col items-center transition-all duration-500 border ${idx === 1 ? 'bg-white text-demmy-green border-white shadow-2xl scale-105' : 'bg-white/5 border-white/10 hover:bg-white/20'}`}>
                <div className="text-6xl mb-10">{block.icon}</div>
                <h4 className="font-serif text-3xl mb-3">{block.title}</h4>
                <p className={`text-xs font-black uppercase tracking-[0.2em] mb-12 ${idx === 1 ? 'text-demmy-amber' : 'text-demmy-gold'}`}>{block.audience}</p>
                <div className="space-y-5 mb-12 flex-grow text-left w-full">
                  {block.solutions.map(s => (
                    <div key={s} className="flex gap-4 text-sm font-semibold opacity-80">
                      <span className={idx === 1 ? 'text-demmy-green' : 'text-demmy-gold'}>✔</span> {s}
                    </div>
                  ))}
                </div>
                <Button variant={idx === 1 ? 'primary' : 'secondary'} className="w-full" onClick={() => handleOpenInquiry('inquiry')}>Get Inquiry</Button>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Footer */}
      <footer className="py-32 bg-white border-t border-demmy-green/5">
        <div className="container mx-auto px-6 md:px-12 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-24 mb-24">
            <div className="max-w-md w-full">
              <Logo className="text-5xl mb-8" />
              <p className="text-slate-500 text-lg leading-relaxed mb-12">
                By {PARENT_COMPANY}. Empowering local agriculture and nourishing urban households with traceable food staples.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-16 w-full lg:w-auto">
              <div>
                <h5 className="font-black text-[10px] uppercase tracking-[0.3em] text-demmy-green mb-8">Navigation</h5>
                <ul className="space-y-4 text-sm font-bold text-slate-400">
                  <li><a href="#catalog" className="hover:text-demmy-green transition-colors">Staples Catalog</a></li>
                  <li><button onClick={() => handleOpenInquiry('inquiry')} className="hover:text-demmy-green transition-colors">B2B Supply</button></li>
                </ul>
              </div>
              <div>
                <h5 className="font-black text-[10px] uppercase tracking-[0.3em] text-demmy-green mb-8">Connect</h5>
                <p className="text-sm font-black text-demmy-green mb-4 hover:underline cursor-pointer">+234 812 345 6789</p>
                <p className="text-xs text-slate-400 font-bold leading-relaxed uppercase tracking-tighter">Mon-Sat <br/> 08:00 — 18:00</p>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-demmy-green/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
            <p>© {new Date().getFullYear()} {PARENT_COMPANY}</p>
            <p>Direct from Farm to Table.</p>
          </div>
        </div>
      </footer>
    </div>
    </ErrorBoundary>
  );
}
