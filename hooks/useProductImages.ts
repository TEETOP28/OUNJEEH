import { useState, useEffect } from 'react';
import { fetchProductImages } from '../lib/imageUpload';
import { Product } from '../types';

/**
 * Hook to load and merge product images from Supabase with product data
 * This replaces empty image URLs with uploaded images from database
 */
export const useProductImages = (products: Product[]) => {
  const [enhancedProducts, setEnhancedProducts] = useState<Product[]>(products);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        
        // Fetch all product images from database
        const productImages = await fetchProductImages();
        
        // Create a map of productId -> imageUrl
        const imageMap = new Map<string, string>();
        productImages.forEach((img: any) => {
          // Use the most recent image for each product (or primary if specified)
          if (!imageMap.has(img.product_id) || img.is_primary) {
            imageMap.set(img.product_id, img.image_url);
          }
        });
        
        // Merge uploaded images with product data
        const updated = products.map(product => ({
          ...product,
          image: imageMap.get(product.id) || product.image || ''
        }));
        
        setEnhancedProducts(updated);
      } catch (error) {
        console.error('Error loading product images:', error);
        setEnhancedProducts(products); // Fallback to original products
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [products]);

  return { products: enhancedProducts, loading };
};
