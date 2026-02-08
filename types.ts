
export type ProductTag = 'Home' | 'Retail' | 'Business';

export type CategoryId = 'grains' | 'processed' | 'oils' | 'proteins' | 'all';

export interface Product {
  id: string;
  name: string;
  localName: string;
  description: string;
  category: Exclude<CategoryId, 'all'>;
  tags: ProductTag[];
  image: string;
  details?: string;
  price?: number;
  stockStatus?: string;
}

export interface Category {
  id: Exclude<CategoryId, 'all'>;
  title: string;
  description: string;
}

export interface ServingBlock {
  title: string;
  audience: string;
  problems: string[];
  solutions: string[];
  icon: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
}

export interface FormValidationError {
  field: string;
  message: string;
}

export type InquiryMode = 'order' | 'inquiry';
