# 📸 How to Upload Your Product Images

## What This Does
Replace the Unsplash stock photos with **your actual product photos** (Honey Beans, Rice, Yam Flour, etc.)

---

## 🎯 Step-by-Step Guide

### Step 1: Set Up Supabase (One-Time Setup)

Supabase is like Google Drive for your images. It's **FREE** and stores your photos online.

1. **Go to [supabase.com](https://supabase.com)**
   - Click "Start your project" 
   - Sign up with Google/GitHub (easiest way)

2. **Create a New Project:**
   - Click "New Project"
   - Name: `ounjeeh` (or whatever you like)
   - Database Password: Create a strong password (SAVE IT!)
   - Region: Choose closest to Nigeria (e.g., "Singapore" or "Frankfurt")
   - Click "Create new project"
   - Wait 2-3 minutes for setup

3. **Get Your Credentials:**
   - In your project, click **Settings** (gear icon on left)
   - Click **API**
   - You'll see:
     - **Project URL** (looks like: `https://abcdefgh.supabase.co`)
     - **anon public** key (long text starting with `eyJ...`)
   - Keep this page open!

4. **Update Your .env File:**
   - Open the `.env` file in your project
   - Replace `your-project-url.supabase.co` with YOUR Project URL
   - Replace `your-anon-key-here` with YOUR anon public key
   - Save the file
   - **Restart your dev server** (Stop and run `npm run dev` again)

5. **Create Storage Bucket:**
   - In Supabase, click **Storage** (on left sidebar)
   - Click **"New bucket"**
   - Name: `product-images`
   - Make it **PUBLIC** ✅ (toggle the switch)
   - Click Create

---

### Step 2: Upload Product Images

1. **Go to Admin Page:**
   - In your browser, add `#admin` to the URL
   - Example: `localhost:5173#admin`

2. **Click "Upload Product Images"**

3. **Fill the Form:**
   - **Select Product:** Choose which product (e.g., "Honey Beans")
   - **Choose Photo:** Click "Choose File" and select your product photo
   - You'll see a preview
   - Click "Upload Image"

4. **Wait for Upload:**
   - You'll see "Uploading..." 
   - Then "Success!" message

5. **See the Result:**
   - Go back to homepage (click "Back to Homepage")
   - **Refresh the page**
   - Your product photo should now show instead of the stock photo!

---

## 📋 Product List

You can upload images for these products:

| ID | Product Name | Local Name |
|----|--------------|------------|
| 1  | Honey Beans | Oloyin |
| 2  | Short Grain Rice | Iresi Gbebi |
| 3  | Yam Flour | Elubo Isu |
| 4  | Pure Palm Oil | Epo Pupa |
| 5  | White Garri | Garri Funfun |
| 6  | Dried Catfish | Eja Gbigbe |

---

## 📷 Photo Tips

### Best Practices:
- ✅ **High resolution:** At least 800x800 pixels
- ✅ **Good lighting:** Natural light works best
- ✅ **Clear focus:** Product should be main subject
- ✅ **Clean background:** White or simple backgrounds
- ✅ **File size:** Under 5MB
- ✅ **Format:** JPG, PNG, or WebP

### Examples:
- ❌ BAD: Dark, blurry, product is tiny in corner
- ✅ GOOD: Bright, sharp, product fills most of frame

---

## 🔄 How It Works

1. **Before Upload:**
   - Website shows Unsplash stock photos
   - Generic food images, not your actual products

2. **After Upload:**
   - Your image gets saved to Supabase cloud storage
   - Website automatically uses YOUR image instead
   - Stock photo is replaced

3. **Updating Images:**
   - Just upload again for the same product
   - New image replaces old one
   - Refresh page to see changes

---

## ❓ Troubleshooting

### "Upload Failed" Error
**Problem:** Supabase not configured properly
**Solution:** 
- Check your `.env` file has correct credentials
- Make sure you created `product-images` bucket
- Restart your dev server (`npm run dev`)

### "Invalid file type" Error
**Problem:** Wrong file format
**Solution:** Only use JPG, PNG, or WebP files

### "File too large" Error
**Problem:** Image over 5MB
**Solution:** Compress your image using:
- [TinyPNG.com](https://tinypng.com) (free)
- Or resize in Paint/Photoshop

### Image Not Showing After Upload
**Problem:** Browser cache
**Solution:** 
- Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Or clear browser cache

### Can't Access Admin Page
**Problem:** Wrong URL
**Solution:** Add `#admin` to end of URL
- Example: `localhost:5173#admin`
- NOT `localhost:5173/admin`

---

## 🆘 Need Help?

### Check These Files:
1. `.env` - Are credentials correct?
2. Supabase Dashboard - Is `product-images` bucket created and public?
3. Browser Console (F12) - Any error messages?

### Common Issues:
- **Blank page:** Supabase URL/key is wrong
- **Upload button doesn't work:** Bucket not created
- **Image doesn't show:** Hard refresh page

---

## 🎉 You're Done!

Once set up:
1. Upload takes 10 seconds per image
2. Images automatically replace stock photos
3. Works on all pages where product appears

**Happy uploading! 📸**
