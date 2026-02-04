# ✅ OUNJEEH Image Upload - Setup Checklist

## Status: Ready for Supabase Configuration

### ✅ Completed
- [x] All files created successfully
  - [x] lib/imageUpload.ts
  - [x] components/ImageUploadForm.tsx  
  - [x] components/TeamSection.tsx
  - [x] AdminPage.tsx
  - [x] App.tsx updated with routing
- [x] .env file created
- [x] Documentation files created

---

## 🎯 Next Steps (Do These Now)

### 1. Configure .env File (2 minutes)

**The .env file is now open in Notepad. Update these values:**

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Where to get these values:**
1. Go to: https://supabase.com/dashboard
2. Select your project (or click "New Project" if you don't have one)
3. Click **Settings** (gear icon in left sidebar)
4. Click **API**
5. Copy:
   - **Project URL** → paste into VITE_SUPABASE_URL
   - **anon public key** → paste into VITE_SUPABASE_ANON_KEY
6. Save the .env file

---

### 2. Create Database Tables (2 minutes)

1. In Supabase Dashboard, click **SQL Editor** (left sidebar)
2. Click **New query**
3. Open the file `SUPABASE-DATABASE-SETUP.sql` (in this project folder)
4. **Copy ALL the SQL code** (Ctrl+A, Ctrl+C)
5. **Paste** into the SQL Editor in Supabase
6. Click **Run** (or press F5)
7. You should see: ✅ "Success. No rows returned"

**What this does:** Creates 3 tables:
- `team_members` - Store team member info
- `product_images` - For future product uploads
- `gallery_images` - For general images

---

### 3. Create Storage Bucket (1 minute)

1. In Supabase Dashboard, click **Storage** (left sidebar)
2. Click **New bucket**
3. Bucket name: `team-photos`
4. **Important:** Toggle **Public bucket** ON ✅
5. Click **Create bucket**

**Configure Bucket Policies:**
1. Click on the `team-photos` bucket you just created
2. Click **Policies** tab at the top
3. You should see policies are already created from the SQL
4. If not, click **New policy** and add:
   - **For SELECT (read):** Allow all
   - **For INSERT (upload):** Allow all (temporary - for testing)

---

### 4. Test the System (1 minute)

Open PowerShell in this project folder and run:

```powershell
npm run dev
```

Then:
1. **Homepage:** http://localhost:5173
2. **Admin Panel:** http://localhost:5173/#admin

**Upload your first team member:**
1. Go to admin panel
2. Click "Add Team Member"
3. Fill in:
   - Name: John Doe
   - Role: CEO & Founder
   - Photo: Select any JPG/PNG (under 5MB)
4. Click "Add Team Member"
5. Wait for success message
6. Go to homepage
7. Scroll down → See your team member! 🎉

---

## 🔍 Verification

After each step, verify:

**After Step 1 (.env):**
- [ ] .env file has your actual Supabase URL (not "your-project-url")
- [ ] .env file has your actual anon key (not "your-anon-key")
- [ ] Save and close the file

**After Step 2 (Database):**
- [ ] SQL ran without errors in Supabase
- [ ] In Supabase Dashboard → **Table Editor**, you can see:
  - team_members table
  - product_images table
  - gallery_images table

**After Step 3 (Storage):**
- [ ] `team-photos` bucket exists in Supabase Storage
- [ ] Bucket is marked as "Public"
- [ ] Policies show SELECT and INSERT allowed

**After Step 4 (Test):**
- [ ] Dev server starts without errors
- [ ] Can access http://localhost:5173
- [ ] Can access http://localhost:5173/#admin
- [ ] Upload form appears on admin page
- [ ] Test upload succeeds
- [ ] Image appears on homepage Team Section

---

## 🆘 Troubleshooting

**"Supabase credentials not found" warning:**
→ Make sure .env file is saved and restart dev server (Ctrl+C, then npm run dev)

**"Failed to upload" error:**
→ Check storage bucket exists and is public

**"Failed to save to database" error:**
→ Run the SQL script again in Supabase

**Image doesn't show on website:**
→ Check browser console (F12) for errors
→ Verify image URL in Supabase → Table Editor → team_members

**Admin page is blank:**
→ Check browser console for import errors
→ Make sure all files were created

---

## 📞 Quick Links

- **Supabase Dashboard:** https://supabase.com/dashboard
- **Your Project Storage:** Dashboard → Storage → team-photos
- **Your Database Tables:** Dashboard → Table Editor → team_members
- **Local Admin Panel:** http://localhost:5173/#admin
- **Full Documentation:** See QUICK-START.md

---

## ✨ You're Almost There!

Complete the 4 steps above (should take ~5 minutes total) and you'll be uploading team photos through a beautiful form!

**Current file ready:** .env is open in Notepad - update it now!
**Next:** Run the SQL, create bucket, then `npm run dev`

---

*Last updated: Setup completed, awaiting Supabase configuration*
