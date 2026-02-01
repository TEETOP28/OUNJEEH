import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Image loading from Supabase will not work.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Get the public URL for an image from Supabase Storage
 * @param bucket - The storage bucket name
 * @param path - The file path within the bucket
 * @returns Public URL for the image
 */
export const getImageUrl = (bucket: string, path: string): string => {
  if (!supabaseUrl) return '';
  
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

/**
 * List all files in a specific bucket folder
 * @param bucket - The storage bucket name
 * @param folder - The folder path (optional)
 * @returns Array of file objects
 */
export const listImages = async (bucket: string, folder: string = '') => {
  const { data, error } = await supabase.storage.from(bucket).list(folder);
  
  if (error) {
    console.error('Error listing images:', error);
    return [];
  }
  
  return data;
};

/**
 * Upload an image to Supabase Storage
 * @param bucket - The storage bucket name
 * @param path - The file path within the bucket
 * @param file - The file to upload
 * @returns Upload result
 */
export const uploadImage = async (bucket: string, path: string, file: File) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    });
  
  if (error) {
    console.error('Error uploading image:', error);
    return { success: false, error };
  }
  
  return { success: true, data };
};

/**
 * Delete an image from Supabase Storage
 * @param bucket - The storage bucket name
 * @param path - The file path within the bucket
 * @returns Delete result
 */
export const deleteImage = async (bucket: string, path: string) => {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  
  if (error) {
    console.error('Error deleting image:', error);
    return { success: false, error };
  }
  
  return { success: true };
};
