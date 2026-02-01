
import { Product, Category, ServingBlock, Testimonial } from './types';

export const BRAND_NAME = "OUNJEEH" as const;
export const PARENT_COMPANY = "Demmy Agro-Allied Ventures" as const;
export const WHATSAPP_LINK = "https://wa.me/message/2UGF44KYKI3UH1" as const;
export const INQUIRY_FORM_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSdF9gL_t0-IOkXKhULhRLIh9Xg0yi1mbzTLcxuYXPO2F7WYYw/viewform?usp=sf_link" as const;

export const CATEGORIES: Category[] = [
  { id: 'grains', title: 'Premium Grains', description: 'Cleaned, stone-free rice, beans, and nutritious seeds.' },
  { id: 'processed', title: 'Authentic Flours', description: 'Traditional Elubo, Garri, and expertly processed starch staples.' },
  { id: 'oils', title: 'Pure Harvest Oils', description: 'Pure Palm Oil and authentic Nigerian seasonings.' },
  { id: 'proteins', title: 'Dried Proteins', description: 'Sand-free dried fish and high-protein essentials.' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Honey Beans',
    localName: 'Oloyin',
    description: 'Triple-sorted, stone-free, and naturally sweet. Direct from farm harvest.',
    category: 'grains',
    tags: ['Home', 'Retail'],
    image: 'https://images.unsplash.com/photo-1551462147-ff29053fab3e?auto=format&fit=crop&q=80&w=800',
    details: '💡 Best for Gbegiri soup or local porridge. Sourced from North-Central Nigeria.'
  },
  {
    id: '2',
    name: 'Short Grain Rice',
    localName: 'Iresi Gbebi',
    description: 'Properly parboiled, sand-free rice that swells perfectly for family meals.',
    category: 'grains',
    tags: ['Home', 'Business'],
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800',
    details: '💡 Ideal for authentic Party Jollof. Parboiled with zero chemical additives.'
  },
  {
    id: '3',
    name: 'Yam Flour',
    localName: 'Elubo Isu',
    description: 'Finely milled and sun-dried. The gold standard for smooth, dark Amala.',
    category: 'processed',
    tags: ['Home', 'Retail'],
    image: 'https://images.unsplash.com/photo-1626197031507-c17099753214?auto=format&fit=crop&q=80&w=800',
    details: '💡 Traditional milling from aged yams for that premium dark texture.'
  },
  {
    id: '4',
    name: 'Pure Palm Oil',
    localName: 'Epo Pupa',
    description: 'Unadulterated, low-acid, and richly colored red oil from the first press.',
    category: 'oils',
    tags: ['Retail', 'Business'],
    image: 'https://images.unsplash.com/photo-1594910413554-e696f5b3f26e?auto=format&fit=crop&q=80&w=800',
    details: '💡 Sourced from virgin presses in Oyo state. High in natural Vitamin A.'
  },
  {
    id: '5',
    name: 'White Garri',
    localName: 'Garri Funfun',
    description: 'Dry, crispy, and perfectly fermented for that authentic sharp taste.',
    category: 'processed',
    tags: ['Home', 'Retail'],
    image: 'https://images.unsplash.com/photo-1600333859399-247514167993?auto=format&fit=crop&q=80&w=800',
    details: '💡 Ijebu-style fermentation. Extra dry for drinking or solid Eba.'
  },
  {
    id: '6',
    name: 'Dried Catfish',
    localName: 'Eja Gbigbe',
    description: 'Oven-dried to preserve nutrients. Clean, sand-free, and vacuum sealed.',
    category: 'proteins',
    tags: ['Home', 'Business'],
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800',
    details: '💡 Traditionally smoked to remove 98% moisture. Sand-free and grit-free.'
  }
];

export const SERVING_BLOCKS: ServingBlock[] = [
  {
    title: 'Families',
    audience: 'Busy homes seeking purity.',
    problems: ['Expensive retail prices', 'Poor food quality', 'Market stress'],
    solutions: ['Doorstep delivery', 'Verified quality', 'Pre-sorted grains'],
    icon: '🍲'
  },
  {
    title: 'Institutions',
    audience: 'Schools & Hospitals.',
    problems: ['Supply inconsistency', 'Logistics headaches', 'Poor hygiene'],
    solutions: ['Scheduled supply', 'Quality traceability', 'Standardized grading'],
    icon: '🏛️'
  },
  {
    title: 'Food Businesses',
    audience: 'Caterers & Restaurants.',
    problems: ['Unreliable middlemen', 'Fluctuating margins', 'Impure ingredients'],
    solutions: ['B2B pricing', 'Direct sourcing', 'Consistent supply'],
    icon: '👨‍🍳'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  { name: 'Mrs. Adebisi', role: 'Homemaker', content: 'The Elubo from OUNJEEH is simply the best. My Amala has never been smoother!' },
  { name: 'Chef Damilola', role: 'Executive Chef', content: 'Demmy Agro-Allied understands quality. Their grains are clean and ready to cook.' },
  { name: 'Greenwood Academy', role: 'Kitchen Lead', content: 'Reliable supply is critical for our students. OUNJEEH delivers every single time.' }
];
