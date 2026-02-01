import { useState, useEffect } from 'react';
import { getImageUrl, listImages } from '../lib/supabase';

interface UseSupabaseImagesOptions {
  bucket: string;
  folder?: string;
  fallbackImages?: string[];
}

interface ImageData {
  name: string;
  url: string;
}

/**
 * Custom hook to fetch images from Supabase Storage
 * Falls back to local images if Supabase is not configured
 */
export const useSupabaseImages = ({ 
  bucket, 
  folder = '', 
  fallbackImages = [] 
}: UseSupabaseImagesOptions) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if Supabase is configured
        if (!import.meta.env.VITE_SUPABASE_URL) {
          // Use fallback images
          const fallbackData = fallbackImages.map((img, index) => ({
            name: `image-${index}`,
            url: img
          }));
          setImages(fallbackData);
          setLoading(false);
          return;
        }

        const files = await listImages(bucket, folder);
        
        if (files.length === 0 && fallbackImages.length > 0) {
          // Use fallback if no images found
          const fallbackData = fallbackImages.map((img, index) => ({
            name: `image-${index}`,
            url: img
          }));
          setImages(fallbackData);
        } else {
          const imageData = files
            .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name))
            .map(file => ({
              name: file.name,
              url: getImageUrl(bucket, `${folder}${folder ? '/' : ''}${file.name}`)
            }));
          
          setImages(imageData);
        }
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Failed to load images');
        
        // Use fallback images on error
        if (fallbackImages.length > 0) {
          const fallbackData = fallbackImages.map((img, index) => ({
            name: `image-${index}`,
            url: img
          }));
          setImages(fallbackData);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bucket, folder]);

  return { images, loading, error };
};

/**
 * Get a single image URL from Supabase with fallback
 */
export const useSupabaseImage = (bucket: string, path: string, fallback: string = '') => {
  const [imageUrl, setImageUrl] = useState<string>(fallback);

  useEffect(() => {
    if (!import.meta.env.VITE_SUPABASE_URL) {
      setImageUrl(fallback);
      return;
    }

    const url = getImageUrl(bucket, path);
    setImageUrl(url || fallback);
  }, [bucket, path, fallback]);

  return imageUrl;
};
