-- ============================================
-- MIGRATION: Add Product Management Fields
-- ============================================
-- Run this SQL in your Supabase Dashboard → SQL Editor
-- This adds new columns to existing product_images table

-- Add new columns if they don't exist
ALTER TABLE product_images 
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS category TEXT,
  ADD COLUMN IF NOT EXISTS price DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS stock_status TEXT DEFAULT 'in-stock';

-- Create index for category filter
CREATE INDEX IF NOT EXISTS idx_product_images_category 
  ON product_images(category);

-- Create index for stock status
CREATE INDEX IF NOT EXISTS idx_product_images_stock_status 
  ON product_images(stock_status);

-- ============================================
-- Verification Query
-- Run this to verify columns were added
-- ============================================
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'product_images'
ORDER BY ordinal_position;
