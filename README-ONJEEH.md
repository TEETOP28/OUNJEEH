# ONJEEH Landing Page 🌾

**Premium Nigerian Food Staples - Farm to Table Delivery**

A modern, accessible, and high-performance landing page for ONJEEH by Demmy Agro-Allied Ventures.

---

## ✨ Features

- 🎨 **Modern Design** - Clean, professional UI with smooth animations
- ♿ **Accessible** - WCAG 2.1 AA compliant with ARIA labels
- 📱 **Responsive** - Mobile-first design that works on all devices
- ⚡ **Performant** - Lazy-loaded images and optimized rendering
- 🔍 **SEO Optimized** - Complete meta tags and structured data
- 🛡️ **Error Handling** - Global error boundary for graceful failures
- ✅ **Form Validation** - Real-time validation with clear error messages
- 🎬 **Scroll Animations** - Smooth entrance effects for all sections
- 💬 **WhatsApp Integration** - Direct ordering through WhatsApp
- ⭐ **Customer Testimonials** - Social proof section

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
OUNJEEH LANDING PAGE/
├── components/          # React components
│   ├── Button.tsx
│   ├── Logo.tsx
│   ├── Navbar.tsx
│   ├── InquiryModal.tsx
│   ├── ConversionModal.tsx
│   ├── StickyMobileCTA.tsx
│   ├── ScrollToTop.tsx
│   ├── ErrorBoundary.tsx
│   ├── TestimonialsSection.tsx
│   └── OptimizedImage.tsx
├── hooks/              # Custom React hooks
│   └── useScrollAnimation.ts
├── images/             # Static images
├── App.tsx             # Main application
├── constants.tsx       # Data and configuration
├── types.ts            # TypeScript definitions
├── index.html          # HTML entry point
└── index.tsx           # React entry point
```

---

## 📚 Documentation

- **[IMPROVEMENTS.md](IMPROVEMENTS.md)** - Complete changelog of enhancements
- **[TESTING-CHECKLIST.md](TESTING-CHECKLIST.md)** - Comprehensive QA checklist
- **[COMPONENT-GUIDE.md](COMPONENT-GUIDE.md)** - Component usage guide
- **[SUMMARY.md](SUMMARY.md)** - Executive summary

---

## 🎯 Key Sections

1. **Hero** - Eye-catching landing with CTA buttons
2. **Why ONJEEH** - 4 USP cards highlighting benefits
3. **Quality Manifesto** - Two-column content with images
4. **Product Catalog** - Filterable grid of 6 products
5. **Solutions** - Services for families, institutions, and businesses
6. **Testimonials** - Customer reviews with ratings ⭐ NEW
7. **Footer** - Company info and contact details

---

## 🛠️ Tech Stack

- **React 19.2.3** - UI library
- **TypeScript 5.8.2** - Type safety
- **Vite 6.2.0** - Build tool
- **Tailwind CSS** - Styling (via CDN)
- **Intersection Observer API** - Scroll animations
- **WhatsApp Business API** - Order integration

---

## 🎨 Customization

### Update Colors

Edit Tailwind config in `index.html`:
```javascript
colors: {
  demmy: {
    green: '#0A5C36',    // Primary
    gold: '#FFC300',     // Accent
    cream: '#FFFEF5',    // Background
  }
}
```

### Add Products

Edit `constants.tsx`:
```tsx
export const PRODUCTS: Product[] = [
  {
    id: '7',
    name: 'New Product',
    localName: 'Yoruba Name',
    category: 'grains',
    // ...
  }
];
```

### Add Testimonials

Edit `constants.tsx`:
```tsx
export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Customer Name',
    role: 'Role',
    content: 'Review text'
  }
];
```

---

## ✅ Testing

Run the QA checklist:
```bash
# Start dev server
npm run dev

# Then follow TESTING-CHECKLIST.md
```

### Key Tests:
- [ ] All animations work
- [ ] Forms validate correctly
- [ ] Images lazy-load
- [ ] Mobile menu functions
- [ ] WhatsApp integration works
- [ ] Testimonials display
- [ ] No console errors

---

## 📊 Performance

**Target Lighthouse Scores**:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 95

### Optimizations Applied:
- ✅ Lazy-loaded images
- ✅ Code splitting ready
- ✅ Intersection Observer (no scroll listeners)
- ✅ Minimal dependencies
- ✅ Optimized re-renders

---

## 🐛 Troubleshooting

### Images not loading
Check that images are in the `images/` folder in the public directory.

### Animations not working
Ensure your browser supports Intersection Observer API (all modern browsers do).

### TypeScript errors
Run `npm install` to ensure all dependencies are installed.

### Form not submitting
Check browser console for JavaScript errors.

---

## 📄 License

© 2026 Demmy Agro-Allied Ventures. All rights reserved.

---

## 📞 Contact

**ONJEEH by Demmy Agro-Allied Ventures**

- 📱 WhatsApp: +234 812 345 6789
- 📧 Email: info@onjeeh.com
- 🌐 Website: https://onjeeh.com

---

## 📈 Recent Updates

### February 1, 2026 - Major Improvements ✅
- ✅ Split into modular components (10+ new files)
- ✅ Added comprehensive SEO meta tags
- ✅ Implemented testimonials section with animations
- ✅ Enhanced accessibility (WCAG 2.1 AA compliant)
- ✅ Added scroll-triggered animations
- ✅ Created global error boundary
- ✅ Improved form validation (real-time)
- ✅ Strengthened TypeScript types
- ✅ Optimized images with lazy loading
- ✅ Complete documentation suite

**See [IMPROVEMENTS.md](IMPROVEMENTS.md) for full details.**

---

**Built with ❤️ for authentic Nigerian food staples**
