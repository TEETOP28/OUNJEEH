-- ============================================
-- Insert Records for Already-Uploaded Images
-- ============================================
-- Run this in Supabase SQL Editor to add database records
-- for the 3 images you already uploaded to storage

-- You need to map each image to its product_id
-- Replace 'product-X' with the actual product IDs from your constants.tsx
-- Your products: honey-beans, short-grain-rice, yam-flour, palm-oil, white-garri, dried-catfish

-- Example: If 1770230028373-efunpv.jpeg is for Honey Beans:
INSERT INTO product_images (product_id, product_name, image_path, image_url, is_primary)
VALUES 
  (
    'honey-beans', -- Replace with actual product ID
    'Honey Beans', -- Replace with actual product name
    '1770230028373-efunpv.jpeg',
    'https://YOUR_SUPABASE_URL/storage/v1/object/public/OUNJEEH STAPLES/1770230028373-efunpv.jpeg',
    true
  );

-- Example: If 1770292120829-2dojiq.jpeg is for Short Grain Rice:
INSERT INTO product_images (product_id, product_name, image_path, image_url, is_primary)
VALUES 
  (
    'short-grain-rice', -- Replace with actual product ID
    'Short Grain Rice', -- Replace with actual product name
    '1770292120829-2dojiq.jpeg',
    'https://YOUR_SUPABASE_URL/storage/v1/object/public/OUNJEEH STAPLES/1770292120829-2dojiq.jpeg',
    true
  );

-- Example: If 1770292232518-2d8aad.jpeg is for Yam Flour:
INSERT INTO product_images (product_id, product_name, image_path, image_url, is_primary)
VALUES 
  (
    'yam-flour', -- Replace with actual product ID
    'Yam Flour', -- Replace with actual product name
    '1770292232518-2d8aad.jpeg',
    'https://YOUR_SUPABASE_URL/storage/v1/object/public/OUNJEEH STAPLES/1770292232518-2d8aad.jpeg',
    true
  );

-- ============================================
-- Verify the inserts worked:
-- ============================================
SELECT * FROM product_images ORDER BY created_at DESC;
