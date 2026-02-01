# 📦 Component Usage Guide

This guide shows how to use each component in the ONJEEH landing page.

---

## 🎨 Components

### 1. Logo Component

**Location**: `components/Logo.tsx`

**Purpose**: Display the ONJEEH brand logo with styled punctuation.

**Usage**:
```tsx
import { Logo } from './components/Logo';

<Logo className="text-3xl" />
<Logo className="text-5xl md:text-7xl" />
```

**Props**:
- `className?` (string) - Additional CSS classes

---

### 2. Navbar Component

**Location**: `components/Navbar.tsx`

**Purpose**: Main navigation with mobile menu support.

**Usage**:
```tsx
import { Navbar } from './components/Navbar';
import { InquiryMode } from './types';

const handleOpenInquiry = (mode: InquiryMode) => {
  // Handle inquiry modal opening
};

<Navbar onOpenInquiry={handleOpenInquiry} />
```

**Props**:
- `onOpenInquiry` (function) - Callback when inquiry button clicked

**Features**:
- Sticky navigation on scroll
- Mobile hamburger menu
- Smooth scroll to sections
- Focus states for accessibility

---

### 3. InquiryModal Component

**Location**: `components/InquiryModal.tsx`

**Purpose**: Modal form for customer inquiries and orders.

**Usage**:
```tsx
import { InquiryModal } from './components/InquiryModal';

<InquiryModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  mode="inquiry"
  productName="Honey Beans"
/>
```

**Props**:
- `isOpen` (boolean) - Control modal visibility
- `onClose` (function) - Callback when modal closes
- `mode` (InquiryMode) - 'order' or 'inquiry'
- `productName?` (string) - Product name for orders

**Features**:
- Real-time form validation
- Error messages per field
- WhatsApp integration
- Accessible form labels
- ARIA announcements

---

### 4. ConversionModal Component

**Location**: `components/ConversionModal.tsx`

**Purpose**: Timed popup to encourage conversions.

**Usage**:
```tsx
import { ConversionModal } from './components/ConversionModal';

<ConversionModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onOpenInquiry={handleOpenInquiry}
/>
```

**Props**:
- `isOpen` (boolean) - Control modal visibility
- `onClose` (function) - Callback when modal closes
- `onOpenInquiry` (function) - Callback to open inquiry modal

**Trigger Logic** (in App.tsx):
```tsx
// Show after 15 seconds OR when user scrolls near bottom
useEffect(() => {
  const timer = setTimeout(() => setIsModalOpen(true), 15000);
  const handleScroll = () => {
    const scrolled = window.innerHeight + window.scrollY;
    const threshold = document.documentElement.scrollHeight - 300;
    if (scrolled >= threshold) setIsModalOpen(true);
  };
  window.addEventListener('scroll', handleScroll);
  return () => {
    clearTimeout(timer);
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
```

---

### 5. StickyMobileCTA Component

**Location**: `components/StickyMobileCTA.tsx`

**Purpose**: Fixed bottom CTA button on mobile devices.

**Usage**:
```tsx
import { StickyMobileCTA } from './components/StickyMobileCTA';

<StickyMobileCTA onOpenInquiry={handleOpenInquiry} />
```

**Props**:
- `onOpenInquiry` (function) - Callback when button clicked

**Features**:
- Only visible on mobile (< 768px)
- Appears after scrolling 500px
- Slides up from bottom
- WhatsApp icon

---

### 6. ScrollToTop Component

**Location**: `components/ScrollToTop.tsx`

**Purpose**: Button to scroll back to top of page.

**Usage**:
```tsx
import { ScrollToTop } from './components/ScrollToTop';

<ScrollToTop />
```

**Props**: None

**Features**:
- Appears after scrolling 800px
- Smooth scroll animation
- Hover scale effect
- Accessible label

---

### 7. TestimonialsSection Component

**Location**: `components/TestimonialsSection.tsx`

**Purpose**: Display customer testimonials with animations.

**Usage**:
```tsx
import { TestimonialsSection } from './components/TestimonialsSection';

<TestimonialsSection />
```

**Props**: None (uses `TESTIMONIALS` from constants)

**Features**:
- Scroll-triggered fade-in
- Staggered card animations
- 5-star ratings
- Trust badge
- Responsive grid

**Data Source**: `constants.tsx`
```tsx
export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Mrs. Adebisi',
    role: 'Homemaker',
    content: 'The Elubo from ONJEEH is...'
  }
];
```

---

### 8. OptimizedImage Component

**Location**: `components/OptimizedImage.tsx`

**Purpose**: Lazy-loaded images with skeleton loaders.

**Usage**:
```tsx
import { OptimizedImage } from './components/OptimizedImage';

<OptimizedImage
  src="images/product.jpg"
  alt="Product description"
  className="w-full h-80"
  loading="lazy"
/>

// For hero images (load immediately)
<OptimizedImage
  src="hero.jpg"
  alt="Hero"
  className="w-full h-screen"
  loading="eager"
/>
```

**Props**:
- `src` (string) - Image URL
- `alt` (string) - Alt text for accessibility
- `className?` (string) - CSS classes
- `loading?` ('lazy' | 'eager') - Loading strategy (default: 'lazy')
- `onLoad?` (function) - Callback when image loads

**Features**:
- Intersection Observer lazy loading
- Skeleton loader during load
- Smooth fade-in transition
- 50px rootMargin for preloading
- Automatic cleanup

---

### 9. ErrorBoundary Component

**Location**: `components/ErrorBoundary.tsx`

**Purpose**: Catch and handle React component errors.

**Usage**:
```tsx
import { ErrorBoundary } from './components/ErrorBoundary';

<ErrorBoundary>
  <App />
</ErrorBoundary>
```

**Props**:
- `children` (ReactNode) - Components to wrap

**Features**:
- Catches all React errors
- User-friendly error display
- Technical details in collapsible
- Refresh and "Go Home" buttons
- Console error logging

**Testing**:
```tsx
// Throw error intentionally to test
if (process.env.NODE_ENV === 'development') {
  throw new Error('Test error boundary');
}
```

---

## 🪝 Hooks

### useScrollAnimation Hook

**Location**: `hooks/useScrollAnimation.ts`

**Purpose**: Trigger animations when element enters viewport.

**Usage**:
```tsx
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const MyComponent = () => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px',
    triggerOnce: true
  });

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      Content
    </div>
  );
};
```

**Options**:
- `threshold?` (number) - % of element visible to trigger (default: 0.1)
- `rootMargin?` (string) - Margin around viewport (default: '0px')
- `triggerOnce?` (boolean) - Only trigger once (default: true)

**Returns**:
- `elementRef` - Ref to attach to element
- `isVisible` - Boolean indicating visibility

**Example with Multiple Elements**:
```tsx
const Card = ({ title, delay }) => {
  const { elementRef, isVisible } = useScrollAnimation();
  
  return (
    <div
      ref={elementRef}
      className={`transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {title}
    </div>
  );
};
```

---

## 📝 Types & Interfaces

### InquiryMode Type
```tsx
export type InquiryMode = 'order' | 'inquiry';
```

### CategoryId Type
```tsx
export type CategoryId = 'grains' | 'processed' | 'oils' | 'proteins' | 'all';
```

### ProductTag Type
```tsx
export type ProductTag = 'Home' | 'Retail' | 'Business';
```

### Product Interface
```tsx
export interface Product {
  id: string;
  name: string;
  localName: string;
  description: string;
  category: Exclude<CategoryId, 'all'>;
  tags: ProductTag[];
  image: string;
  details?: string;
}
```

### Testimonial Interface
```tsx
export interface Testimonial {
  name: string;
  role: string;
  content: string;
}
```

---

## 🎯 Common Patterns

### 1. Opening Inquiry Modal
```tsx
const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
const [inquiryMode, setInquiryMode] = useState<InquiryMode>('inquiry');
const [selectedProduct, setSelectedProduct] = useState<string>();

const handleOpenInquiry = (mode: InquiryMode, productName?: string) => {
  setInquiryMode(mode);
  setSelectedProduct(productName);
  setIsInquiryModalOpen(true);
};

// From button
<Button onClick={() => handleOpenInquiry('inquiry')}>
  Get Inquiry
</Button>

// From product card
<Button onClick={() => handleOpenInquiry('order', 'Honey Beans')}>
  Order Now
</Button>
```

### 2. Filtering Products
```tsx
const [activeCategory, setActiveCategory] = useState<CategoryId>('all');

const filteredProducts = activeCategory === 'all' 
  ? PRODUCTS 
  : PRODUCTS.filter(p => p.category === activeCategory);

// Filter buttons
{CATEGORIES.map(cat => (
  <button
    onClick={() => setActiveCategory(cat.id)}
    className={activeCategory === cat.id ? 'active' : ''}
  >
    {cat.title}
  </button>
))}
```

### 3. Animated Section
```tsx
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const AnimatedSection = ({ children, id }) => {
  const { elementRef, isVisible } = useScrollAnimation();
  
  return (
    <section
      ref={elementRef}
      id={id}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </section>
  );
};
```

---

## 🔧 Customization

### Changing Colors
Edit Tailwind config in `index.html`:
```javascript
colors: {
  demmy: {
    green: '#0A5C36',    // Primary color
    gold: '#FFC300',     // Accent color
    cream: '#FFFEF5',    // Background
    // ...
  }
}
```

### Adding New Testimonial
Edit `constants.tsx`:
```tsx
export const TESTIMONIALS: Testimonial[] = [
  // ... existing testimonials
  {
    name: 'New Customer',
    role: 'Business Owner',
    content: 'Amazing service!'
  }
];
```

### Adding New Product
Edit `constants.tsx`:
```tsx
export const PRODUCTS: Product[] = [
  // ... existing products
  {
    id: '7',
    name: 'New Product',
    localName: 'Yoruba Name',
    description: 'Product description',
    category: 'grains',
    tags: ['Home'],
    image: 'url',
    details: 'Details for hover'
  }
];
```

---

## 🐛 Troubleshooting

### Images not loading
```tsx
// Check image paths - they should be in public folder
<OptimizedImage src="images/product.jpg" />  // ✅ Correct
<OptimizedImage src="/images/product.jpg" /> // ✅ Also works
<OptimizedImage src="./images/product.jpg" /> // ❌ Wrong
```

### Animations not triggering
```tsx
// Make sure element has ref attached
const { elementRef, isVisible } = useScrollAnimation();
<div ref={elementRef}> // ✅ Ref attached
```

### Form validation not showing
```tsx
// Check that errors state is initialized
const [errors, setErrors] = useState<Partial<FormData>>({});
```

---

## 📚 Additional Resources

- **React Docs**: https://react.dev
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Intersection Observer API**: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/

---

**Last Updated**: February 1, 2026  
**Project**: ONJEEH by Demmy Agro-Allied Ventures
