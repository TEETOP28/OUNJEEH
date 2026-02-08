-- Create table for storing customer inquiries and orders
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  state VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  message TEXT,
  mode VARCHAR(20) NOT NULL CHECK (mode IN ('order', 'inquiry')),
  product_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_mode ON inquiries(mode);
CREATE INDEX IF NOT EXISTS idx_inquiries_state ON inquiries(state);

-- Enable Row Level Security
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow insertions from anyone (for form submissions)
CREATE POLICY "Allow public insert" ON inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow admins to read all inquiries
CREATE POLICY "Allow authenticated read" ON inquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- Add comments for documentation
COMMENT ON TABLE inquiries IS 'Stores customer inquiries and orders from the website';
COMMENT ON COLUMN inquiries.mode IS 'Type of inquiry: order or general inquiry';
COMMENT ON COLUMN inquiries.product_name IS 'Product name if mode is order';
