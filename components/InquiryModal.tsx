import React, { useState } from 'react';
import { Button } from './Button';
import { InquiryMode } from '../types';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: InquiryMode;
  productName?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose, mode, productName }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = 'Please enter a valid name (at least 2 characters)';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    const phoneRegex = /^[\d\s+()-]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Prepare data payload for Google Sheets
    const formPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      mode: mode,
      productName: productName || 'N/A',
      timestamp: new Date().toISOString()
    };
    
    // Send data to Google Sheets web app (non-blocking)
    try {
      fetch('https://script.google.com/macros/s/AKfycbzACmq99YdmfYWli6MH57zsWK2IdkH8hormb44SIRKUshI7tJ8JY96fGdSvfO_dd4kT/exec', {
        method: 'POST',
        body: JSON.stringify(formPayload),
        headers: {
          'Content-Type': 'application/json'
        }
      }).catch(err => console.error('Google Sheets webhook error:', err));
    } catch (error) {
      console.error('Failed to send to Google Sheets:', error);
    }
    
    // Construct the WhatsApp payload
    const intro = mode === 'order' 
      ? `Hello OUNJEEH! I'd like to place an order for *${productName || 'your produce'}*.` 
      : `Hello OUNJEEH! I have a general inquiry regarding your farm-to-table services.`;
    
    const details = `\n\n*Customer Details:*\n👤 Name: ${formData.name}\n📧 Email: ${formData.email}\n📞 Phone: ${formData.phone}\n Note: ${formData.message || 'No additional note'}`;
    
    const encodedMsg = encodeURIComponent(intro + details);
    const finalWhatsappLink = `https://wa.me/message/2UGF44KYKI3UH1?text=${encodedMsg}`;

    // Redirect to WhatsApp
    window.open(finalWhatsappLink, '_blank');
    onClose();
    
    // Reset form state
    setFormData({ name: '', email: '', phone: '', message: '' });
    setErrors({});
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
    >
      <div 
        className="absolute inset-0 bg-demmy-forest/80 backdrop-blur-md" 
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <div className="relative w-full max-w-xl bg-white rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        <div className="harvest-gradient p-10 text-white text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           <h3 id="inquiry-modal-title" className="font-serif text-3xl mb-2 relative z-10">
             {mode === 'order' ? 'Confirm Your Order' : 'Speak with Sales'}
           </h3>
           <p className="text-emerald-100/70 text-sm font-medium relative z-10">
             {mode === 'order' ? `Produce: ${productName}` : 'Fill in the details for a personalized quote'}
           </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-5" noValidate>
          <div className="space-y-1">
            <label htmlFor="inquiry-name" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
              Full Name *
            </label>
            <input 
              id="inquiry-name"
              required
              type="text" 
              placeholder="e.g. John Doe"
              className={`w-full px-6 py-4 rounded-2xl bg-slate-50 border ${errors.name ? 'border-red-400' : 'border-slate-100'} focus:border-demmy-green focus:bg-white transition-all outline-none text-slate-700 font-medium`}
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && <p id="name-error" className="text-red-500 text-xs ml-2 mt-1">{errors.name}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="inquiry-email" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
              Email Address *
            </label>
            <input 
              id="inquiry-email"
              required
              type="email" 
              placeholder="john@example.com"
              className={`w-full px-6 py-4 rounded-2xl bg-slate-50 border ${errors.email ? 'border-red-400' : 'border-slate-100'} focus:border-demmy-green focus:bg-white transition-all outline-none text-slate-700 font-medium`}
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && <p id="email-error" className="text-red-500 text-xs ml-2 mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="inquiry-phone" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
              Phone Number *
            </label>
            <input 
              id="inquiry-phone"
              required
              type="tel" 
              placeholder="080 000 0000"
              className={`w-full px-6 py-4 rounded-2xl bg-slate-50 border ${errors.phone ? 'border-red-400' : 'border-slate-100'} focus:border-demmy-green focus:bg-white transition-all outline-none text-slate-700 font-medium`}
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && <p id="phone-error" className="text-red-500 text-xs ml-2 mt-1">{errors.phone}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="inquiry-message" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
              Message
            </label>
            <textarea 
              id="inquiry-message"
              rows={2}
              placeholder="Quantity, frequency, or special requests..."
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-demmy-green focus:bg-white transition-all outline-none text-slate-700 font-medium resize-none"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
            />
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <Button variant="primary" className="w-full py-5 rounded-2xl shadow-xl shadow-demmy-green/20">
              Complete on WhatsApp
              <svg className="w-5 h-5 ml-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </Button>
            <button 
              type="button" 
              onClick={onClose} 
              className="text-slate-400 hover:text-slate-600 transition-colors py-2 font-bold text-xs uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-demmy-green focus:ring-offset-2 rounded"
            >
              Maybe Later
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
