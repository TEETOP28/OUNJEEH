-- ============================================
-- OUNJEEH Image Upload System - Database Setup
-- ============================================
-- Run this SQL in your Supabase Dashboard → SQL Editor
-- This creates the necessary tables for the image upload system

-- Table for team members
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image_path TEXT NOT NULL,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for product images
CREATE TABLE IF NOT EXISTS product_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  image_path TEXT NOT NULL,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for gallery images (general purpose)
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  description TEXT,
  category TEXT,
  image_path TEXT NOT NULL,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Enable Row Level Security (RLS)
-- ============================================
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Public Read Access Policies
-- Anyone can view the data (for public website)
-- ============================================
CREATE POLICY "Public read access for team_members" 
  ON team_members FOR SELECT 
  USING (true);

CREATE POLICY "Public read access for product_images" 
  ON product_images FOR SELECT 
  USING (true);

CREATE POLICY "Public read access for gallery_images" 
  ON gallery_images FOR SELECT 
  USING (true);

-- ============================================
-- Admin Write Access Policies
-- TEMPORARY: Allow all writes (for development)
-- TODO: Replace with proper authentication checks
-- ============================================
CREATE POLICY "Admin write access for team_members" 
  ON team_members FOR ALL 
  USING (true);

CREATE POLICY "Admin write access for product_images" 
  ON product_images FOR ALL 
  USING (true);

CREATE POLICY "Admin write access for gallery_images" 
  ON gallery_images FOR ALL 
  USING (true);

-- ============================================
-- Indexes for Performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_team_members_active 
  ON team_members(is_active, display_order);

CREATE INDEX IF NOT EXISTS idx_product_images_product_id 
  ON product_images(product_id);

CREATE INDEX IF NOT EXISTS idx_gallery_images_category 
  ON gallery_images(category, display_order);

-- ============================================
-- Functions for Updated Timestamps
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- Triggers for Auto-updating Timestamps
-- ============================================
CREATE TRIGGER update_team_members_updated_at 
  BEFORE UPDATE ON team_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_images_updated_at 
  BEFORE UPDATE ON product_images
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_images_updated_at 
  BEFORE UPDATE ON gallery_images
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Sample Data (Optional - for testing)
-- ============================================
-- Uncomment to insert sample data

-- INSERT INTO team_members (name, role, image_path, image_url, display_order) VALUES
--   ('John Doe', 'CEO & Founder', 'sample/john.jpg', 'https://placeholder.com/john.jpg', 1),
--   ('Jane Smith', 'Creative Director', 'sample/jane.jpg', 'https://placeholder.com/jane.jpg', 2);

-- ============================================
-- Verification Query
-- Run this to verify tables were created
-- ============================================
SELECT 
  tablename, 
  schemaname 
FROM pg_tables 
WHERE tablename IN ('team_members', 'product_images', 'gallery_images');
