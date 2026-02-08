import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import { PRODUCTS as FALLBACK_PRODUCTS } from '../constants';

/**
 * Hook to load ALL products from Supabase database
 * Falls back to hardcoded products if database is empty or fails
 */
export const useProductsFromDatabase = () => {
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all products from database
        const { data: dbProducts, error: dbError } = await supabase
          .from('product_images')
          .select('*')
          .order('created_at', { ascending: false });

        if (dbError) {
          throw dbError;
        }

        // If we have products in the database, use them
        if (dbProducts && dbProducts.length > 0) {
          // Transform database products to match Product interface
          const transformedProducts: Product[] = dbProducts.map((dbProduct) => ({
            id: dbProduct.product_id,
            name: dbProduct.product_name,
            localName: '', // Not stored in DB, can be added later
            description: dbProduct.description || '',
            category: (dbProduct.category || 'grains') as any,
            tags: [], // Not stored in DB, can be added later
            image: dbProduct.image_url,
            details: dbProduct.description || '',
            price: dbProduct.price,
            stockStatus: dbProduct.stock_status
          }));
          
          setProducts(transformedProducts);
          console.log('✅ Loaded products from database:', transformedProducts.length);
        } else {
          // No products in database, use fallback
          console.log('ℹ️ No products in database, using fallback products');
          setProducts(FALLBACK_PRODUCTS);
        }
      } catch (err) {
        console.error('❌ Error loading products from database:', err);
        setError(err instanceof Error ? err.message : 'Failed to load products');
        // Fall back to hardcoded products on error
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return { products, loading, error };
};
