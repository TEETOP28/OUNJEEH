# Product Management System - User Guide

## 🚀 Overview

Your admin page now has a full **Product Management System** that allows you to:
- ✅ **Create** new products
- ✅ **Edit** existing products (name, description, price, stock status, images)
- ✅ **Delete** products
- ✅ **Upload images** to any product

## 📍 Accessing the Admin Panel

1. Go to your website URL and add `#admin` at the end
   - Example: `yoursite.com#admin`
2. You'll see two main options:
   - **Upload Product Images** - Quick upload to existing products
   - **Manage Products** - Full CRUD operations

---

## 🎯 Feature 1: Upload Product Images

**Best for:** Quickly replacing stock photos with real product images

### How to Use:
1. Click **"Upload Product Images"**
2. Select a product from the dropdown
3. Choose an image file (JPG, PNG, WebP)
4. Preview the image
5. Click **"Upload Image"**
6. Image automatically replaces the old one on your website

---

## 🎯 Feature 2: Manage Products (NEW!)

**Best for:** Full control - create, edit, and delete products

### Creating a New Product:

1. Click **"Manage Products"**
2. Click **"Add New Product"** button
3. Fill in the form:
   - **Product Name*** (Required) - e.g., "Premium Honey Beans"
   - **Description** - Detailed product description
   - **Category** - Select from: Grains, Flours, Oils, or Proteins
   - **Price (₦)** - Product price in Naira
   - **Stock Status** - In Stock, Low Stock, or Out of Stock
   - **Product Photo*** (Required) - Upload product image
4. Preview your image
5. Click **"Create Product"**

### Editing an Existing Product:

1. In the product grid, find the product you want to edit
2. Click the **"Edit"** button
3. Modify any field:
   - Change product name
   - Update description
   - Change price
   - Update stock status
   - Upload a new image (optional - only if you want to replace the current image)
4. Click **"Update Product"**

### Deleting a Product:

1. In the product grid, find the product you want to delete
2. Click the **"Delete"** button
3. Confirm deletion
4. Product and its image are permanently removed

---

## 🎨 Product Display Features

Each product card shows:
- Product image
- Product name
- Description
- Price (₦)
- Stock status badge (colored)
- Edit and Delete buttons

---

## 🔧 Database Setup

### For New Users:

Run the main setup file: `SUPABASE-DATABASE-SETUP.sql`

### For Existing Users:

If you already have the database set up, run this migration:
```sql
-- File: ADD-PRODUCT-MANAGEMENT-FIELDS.sql
ALTER TABLE product_images 
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS category TEXT,
  ADD COLUMN IF NOT EXISTS price DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS stock_status TEXT DEFAULT 'in-stock';
```

To run it:
1. Go to Supabase Dashboard
2. Click **SQL Editor**
3. Paste the migration SQL
4. Click **Run**

---

## 💡 Tips & Best Practices

### Image Guidelines:
- **Format:** JPG, PNG, or WebP
- **Size:** At least 800x800 pixels (recommended)
- **Orientation:** Square or landscape works best
- **Quality:** Use high-quality photos with good lighting
- **File Size:** Maximum 5MB

### Product Information:
- **Name:** Be clear and specific (e.g., "Premium Honey Beans" not just "Beans")
- **Description:** Include key features, origin, best uses
- **Price:** Enter actual price or leave blank if price varies
- **Stock Status:** Keep this updated to manage customer expectations

### Category Guidelines:
- **Premium Grains** - Rice, beans, seeds
- **Authentic Flours** - Yam flour, garri, elubo
- **Pure Harvest Oils** - Palm oil, vegetable oils, seasonings
- **Dried Proteins** - Dried fish, crayfish, protein essentials

---

## 🛠️ Troubleshooting

### "Image upload failed"
- Check file size (max 5MB)
- Ensure file format is JPG, PNG, or WebP
- Verify Supabase storage bucket is set to public

### "Failed to load products"
- Verify your `.env` file has correct Supabase credentials
- Check that RLS policies are enabled
- Run the database migration if you're an existing user

### "Failed to save to database"
- Verify the `product_images` table exists
- Check that all required columns are present
- Ensure RLS policies allow INSERT/UPDATE/DELETE

### Products not showing on website
- Refresh the page after uploading
- Check that image URL is valid in Supabase Storage
- Verify the product has `is_primary` set to true

---

## 📊 Database Structure

The `product_images` table includes:
- `id` - Unique identifier (UUID)
- `product_id` - Product identifier (text)
- `product_name` - Product name (text) *required*
- `description` - Product description (text)
- `category` - Product category (text)
- `price` - Product price (decimal)
- `stock_status` - Stock availability (text)
- `image_path` - Storage path (text) *required*
- `image_url` - Public URL (text) *required*
- `is_primary` - Primary image flag (boolean)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

---

## 🎯 Common Workflows

### Workflow 1: Adding Your First Product
1. Go to `yoursite.com#admin`
2. Click "Manage Products"
3. Click "Add New Product"
4. Fill in product details
5. Upload a high-quality image
6. Click "Create Product"
7. Product appears on your website immediately

### Workflow 2: Updating Product Price
1. Go to Admin → Manage Products
2. Find the product
3. Click "Edit"
4. Change the price
5. Click "Update Product"

### Workflow 3: Changing Product Image Only
1. Go to Admin → Upload Product Images (faster option)
2. Select the product
3. Choose new image
4. Upload

### Workflow 4: Managing Stock
1. Go to Admin → Manage Products
2. Click "Edit" on the product
3. Change "Stock Status" to:
   - In Stock (green badge)
   - Low Stock (yellow badge)
   - Out of Stock (red badge)
4. Update product

---

## 🔐 Security Notes

- Currently using development-mode RLS policies (allows all operations)
- **TODO:** Implement proper authentication before production
- Consider adding admin user authentication
- Restrict write access to authenticated admin users only

---

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console for error messages
2. Verify Supabase credentials in `.env` file
3. Ensure all SQL migrations have been run
4. Check that storage bucket exists and is public

---

## 🎉 What's New

### v2.0 - Product Management
- ✅ Full CRUD operations
- ✅ Rich product information (description, price, stock)
- ✅ Category management
- ✅ Stock status indicators
- ✅ Edit mode with image replacement
- ✅ Confirmation dialogs for deletion
- ✅ Automatic image cleanup on delete

### v1.0 - Basic Upload
- Image upload to existing products
- Storage integration
- Database persistence

---

Enjoy managing your products! 🎊
