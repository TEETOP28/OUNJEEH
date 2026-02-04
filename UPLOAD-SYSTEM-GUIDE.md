# 📸 OUNJEEH Image Upload System - Complete Guide

## 🎯 What This System Does

Upload team member photos through a web form → Store in Supabase → Display automatically on your website!

---

## ⚙️ Setup Instructions

### Step 1: Create Database Tables

1. Open your **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your OUNJEEH project
3. Navigate to **SQL Editor** (left sidebar)
4. Copy and paste the contents of `SUPABASE-DATABASE-SETUP.sql`
5. Click **Run** ▶️
6. Verify: You should see "Success. No rows returned"

### Step 2: Create Storage Bucket

1. In Supabase Dashboard, go to **Storage** (left sidebar)
2. Click **New bucket**
3. Bucket name: `team-photos`
4. Make it **Public** ✅ (so images can be viewed on your website)
5. Click **Create bucket**

### Step 3: Configure Bucket Permissions

1. Click on `team-photos` bucket
2. Go to **Policies** tab
3. Click **New policy**
4. Choose **Custom policy**
5. Add these policies:

**Read Policy (Public):**
```sql
Name: Public read access
Target roles: public
SELECT operation
Policy: true
```

**Write Policy (Development - TEMPORARY):**
```sql
Name: Allow uploads (dev)
Target roles: anon
INSERT operation  
Policy: true
```

> ⚠️ **Security Note**: The write policy above allows anyone to upload. Before going to production, you MUST add authentication and restrict uploads to admin users only.

---

## 🚀 How to Use

### Access Admin Panel

Two options:

#### Option A: Add Route to Your App (Recommended)

Update your `App.tsx` or routing file:

```tsx
import { AdminPage } from './AdminPage';

// Add to your routes:
<Route path="/admin" element={<AdminPage />} />
```

Then visit: `http://localhost:5173/admin`

#### Option B: Temporary Test Page

Create `admin.html` in your `public/` folder:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Admin - OUNJEEH</title>
</head>
<body>
  <div id="root"></div>
  <script type="module">
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import { AdminPage } from './AdminPage.tsx';
    
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <AdminPage />
      </React.StrictMode>
    );
  </script>
</body>
</html>
```

### Upload a Team Member Photo

1. Go to admin page
2. Click **"Add Team Member"**
3. Fill in:
   - **Name**: Full name (e.g., "Dr. Sarah Johnson")
   - **Role**: Position (e.g., "CEO & Founder")
   - **Photo**: Select image file (JPG, PNG, WebP, max 5MB)
4. Preview will appear
5. Click **"Add Team Member"**
6. Wait for "Success!" message
7. Refresh your main website → Photo appears automatically! 🎉

---

## 📁 Files Created

| File | Purpose |
|------|---------|
| `lib/imageUpload.ts` | Core upload logic and database functions |
| `components/ImageUploadForm.tsx` | Upload form UI component |
| `components/TeamSection.tsx` | Updated to fetch from database |
| `AdminPage.tsx` | Admin dashboard page |
| `SUPABASE-DATABASE-SETUP.sql` | Database schema |
| `UPLOAD-SYSTEM-GUIDE.md` | This guide |

---

## 🔍 How It Works

```
User fills form
    ↓
Image uploaded to Supabase Storage (team-photos bucket)
    ↓
Record saved to database (team_members table)
    ↓
TeamSection fetches data on load
    ↓
Image displays on website!
```

### Database Schema

**team_members table:**
- `id` - Unique identifier (UUID)
- `name` - Team member's name
- `role` - Their position/role
- `image_path` - Path in storage (e.g., "members/123-abc.jpg")
- `image_url` - Full public URL
- `display_order` - Sort order (lower = appears first)
- `is_active` - Show/hide without deleting
- `created_at` - Timestamp

---

## 🧪 Testing

### Test the Upload

1. Run dev server: `npm run dev`
2. Go to `/admin`
3. Upload a test image
4. Check Supabase Dashboard:
   - **Storage → team-photos**: Should see uploaded file
   - **Table Editor → team_members**: Should see new row
5. Go to homepage → Should see team member displayed

### Troubleshooting

**"Upload failed: 403"**
- Check storage bucket is public
- Verify bucket policies are set correctly

**"Failed to save to database"**
- Run the SQL setup script again
- Check table policies allow INSERT

**Image doesn't display**
- Check browser console for errors
- Verify image URL is accessible
- Check image_url in database table

**"Invalid file type"**
- Only JPG, PNG, WebP allowed
- Max 5MB file size

---

## 🔐 Security (Important!)

### Current State: DEVELOPMENT ONLY

The current setup allows **anyone** to upload images. This is ONLY for development.

### Before Production:

1. **Add Authentication**
   ```tsx
   import { supabase } from './lib/supabase';
   
   // In upload function:
   const { data: { user } } = await supabase.auth.getUser();
   if (!user) {
     throw new Error('Must be logged in');
   }
   ```

2. **Update RLS Policies**
   ```sql
   -- Replace the current write policy with:
   CREATE POLICY "Admin write access" 
     ON team_members FOR ALL 
     USING (
       auth.uid() IN (
         SELECT user_id FROM admin_users
       )
     );
   ```

3. **Create Admin User Table**
   ```sql
   CREATE TABLE admin_users (
     user_id UUID REFERENCES auth.users(id),
     role TEXT DEFAULT 'admin'
   );
   ```

4. **Add Admin Login Page**
   - Use Supabase Auth
   - Restrict admin routes
   - Add logout functionality

---

## 📈 Next Steps

### Extend to Products

Copy the same pattern:

```tsx
// In ImageUploadForm, add product mode:
<ImageUploadForm 
  type="product"  // or "team"
  onSuccess={...}
/>
```

### Add Delete Functionality

```tsx
import { deleteTeamMember } from '../lib/imageUpload';

// In admin panel:
const handleDelete = async (id, imagePath) => {
  await deleteTeamMember(id, imagePath);
};
```

### Add Edit Functionality

```tsx
// Update existing member
const updateTeamMember = async (id, updates) => {
  const { error } = await supabase
    .from('team_members')
    .update(updates)
    .eq('id', id);
};
```

---

## 💡 Tips

- **Image Optimization**: Consider resizing large images before upload (use browser canvas API)
- **Display Order**: Add drag-and-drop to reorder team members
- **Categories**: Add categories for different team sections (Leadership, Staff, Advisors)
- **Bulk Upload**: Add multiple image upload support
- **Image Cropping**: Integrate an image cropper for profile photos

---

## 📞 Need Help?

- Check Supabase Dashboard for errors
- View browser console for client-side errors
- Test database connection: Run `fetchTeamMembers()` in console
- Verify storage bucket is public and accessible

---

## ✅ Checklist

Before considering setup complete:

- [ ] SQL tables created in Supabase
- [ ] Storage bucket `team-photos` created and public
- [ ] Bucket policies configured
- [ ] Admin page accessible
- [ ] Test upload successful
- [ ] Image appears on website
- [ ] Plan for authentication added

---

🎉 **You're all set!** Start uploading team photos and watch them appear on your website automatically!
