# 🔧 Fix: Images Disappearing After Refresh

## Problem
Images appear initially but disappear after refreshing the page or revisiting the website.

## Root Cause
This happens due to **Supabase storage bucket policies** not being properly configured for public access.

---

## ✅ Solution (3 Steps)

### Step 1: Run Storage Policy Fix SQL

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Open the file: `FIX-STORAGE-ACCESS.sql`
3. Copy all the SQL code
4. Paste and click **Run**

This will:
- Enable proper Row Level Security
- Allow public read access to team-photos bucket
- Ensure images are always accessible

---

### Step 2: Verify Bucket is Public

1. In Supabase Dashboard → **Storage**
2. Click on `team-photos` bucket
3. Check that **Public** badge is visible
4. If not, click **Settings** (gear icon) and toggle **Public bucket** ON

---

### Step 3: Check Bucket CORS Settings

1. In the `team-photos` bucket settings
2. Ensure **Allowed origins** includes:
   - `*` (for development)
   - Or your specific domain for production

---

## 🔄 Test the Fix

1. **Clear browser cache**: Ctrl + Shift + Delete
2. **Refresh your website**
3. **Check browser console** (F12) for any image loading errors
4. Images should now persist after refresh!

---

## 🎯 What Changed in Your Code

I've updated two files to make images more reliable:

### 1. `lib/imageUpload.ts`
- ✅ Increased cache duration to 1 year
- ✅ Better error logging
- ✅ Verified public URL generation

### 2. `components/OptimizedImage.tsx`
- ✅ Added error handling
- ✅ Automatic retry (up to 3 times) if image fails
- ✅ Shows fallback UI if image unavailable
- ✅ Added CORS support

---

## 🔍 Debug: Check If Issue Persists

If images still disappear, check these:

### In Browser Console (F12):
```javascript
// Check image URL
console.log(document.querySelector('img').src);

// Try to fetch image directly
fetch('YOUR_IMAGE_URL').then(r => console.log('Status:', r.status));
```

### In Supabase Dashboard:
1. **Storage** → `team-photos` → Click any image
2. Copy the public URL
3. Paste in new browser tab
4. Should show the image (if not, policies are wrong)

### Check Database:
1. **Table Editor** → `team_members`
2. Look at `image_url` column
3. URLs should start with: `https://YOUR-PROJECT.supabase.co/storage/v1/object/public/team-photos/...`

---

## 🔐 Production Security (Important!)

The current setup allows **public read access** (good for displaying images).

**Before going live**, add authentication for uploads:

1. Remove the public INSERT policy
2. Add authenticated-only upload policy
3. Implement admin login

See `UPLOAD-SYSTEM-GUIDE.md` for details.

---

## ✅ Quick Checklist

- [ ] Ran `FIX-STORAGE-ACCESS.sql` in Supabase
- [ ] Verified `team-photos` bucket is Public
- [ ] Checked browser console - no CORS errors
- [ ] Cleared browser cache
- [ ] Refreshed page - images persist
- [ ] Images load on cold start (new tab)

---

## 💡 Prevention Tips

**Always ensure:**
- Storage bucket is marked as Public
- RLS policies allow public SELECT
- Image URLs in database are complete and valid
- CORS is properly configured

---

## 🆘 Still Not Working?

Try these:

1. **Restart dev server** (Ctrl+C, then `npm run dev`)
2. **Re-upload a test image** (it will use the updated code)
3. **Check Supabase logs**: Dashboard → Logs → Storage
4. **Verify .env**: Make sure Supabase URL is correct

---

**After running the SQL fix, your images should load reliably every time!** 🎉
