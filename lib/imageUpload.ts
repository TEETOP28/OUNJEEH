import { supabase } from './supabase';

export interface UploadResult {
  success: boolean;
  imageUrl?: string;
  imagePath?: string;
  error?: string;
}

/**
 * Upload image to Supabase Storage and return URL
 * @param file - The image file to upload
 * @param bucket - The storage bucket name
 * @param folder - Optional folder path
 * @returns Upload result with URL
 */
export const uploadImageToStorage = async (
  file: File,
  bucket: string,
  folder: string = ''
): Promise<UploadResult> => {
  try {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: 'Invalid file type. Please upload JPG, PNG, or WebP images.'
      };
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return {
        success: false,
        error: 'File too large. Maximum size is 5MB.'
      };
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const extension = file.name.split('.').pop();
    const fileName = `${timestamp}-${randomString}.${extension}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      return {
        success: false,
        error: error.message
      };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      success: true,
      imageUrl: urlData.publicUrl,
      imagePath: filePath
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Save team member to database
 */
export const saveTeamMember = async (data: {
  name: string;
  role: string;
  imagePath: string;
  imageUrl: string;
}) => {
  const { data: result, error } = await supabase
    .from('team_members')
    .insert([data])
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: result };
};

/**
 * Save product image to database
 */
export const saveProductImage = async (data: {
  productId: string;
  productName: string;
  imagePath: string;
  imageUrl: string;
  isPrimary?: boolean;
}) => {
  const { data: result, error } = await supabase
    .from('product_images')
    .insert([data])
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: result };
};

/**
 * Fetch all team members from database
 */
export const fetchTeamMembers = async () => {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching team members:', error);
    return [];
  }

  return data;
};

/**
 * Fetch product images from database
 */
export const fetchProductImages = async (productId?: string) => {
  let query = supabase
    .from('product_images')
    .select('*');

  if (productId) {
    query = query.eq('product_id', productId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching product images:', error);
    return [];
  }

  return data;
};

/**
 * Delete team member and their image
 */
export const deleteTeamMember = async (id: string, imagePath: string) => {
  // Delete from storage
  const { error: storageError } = await supabase.storage
    .from('team-photos')
    .remove([imagePath]);

  if (storageError) {
    console.error('Storage deletion error:', storageError);
  }

  // Delete from database
  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
};
