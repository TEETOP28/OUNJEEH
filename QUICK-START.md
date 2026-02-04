# 🚀 Quick Start Guide - Image Upload System

## ⚡ Setup in 5 Minutes

### Step 1: Environment Variables (1 min)

```bash
# Copy the example file
cp .env.example .env
```

Then edit `.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Where to find these:**
1. Go to https://supabase.com/dashboard
2. Select your project (or create one)
3. Click **Settings** → **API**
4. Copy **Project URL** and **anon/public key**

---

### Step 2: Create Database Tables (2 min)

1. In Supabase Dashboard → **SQL Editor**
2. Open `SUPABASE-DATABASE-SETUP.sql` from this project
3. Copy all the SQL
4. Paste in SQL Editor
5. Click **Run** ▶️
6. You should see "Success. No rows returned"

---

### Step 3: Create Storage Bucket (1 min)

1. In Supabase Dashboard → **Storage**
2. Click **New bucket**
3. Name: `team-photos`
4. Make it **Public** ✅
5. Click **Create**

**Configure Policies:**
- Click on `team-photos` bucket
- Go to **Policies** tab
- Add policy: **Allow public read** (SELECT for everyone)
- Add policy: **Allow uploads** (INSERT for anon) - temporary for testing

---

### Step 4: Verify Setup (<1 min)

```bash
node setup-check.js
```

This will verify:
- ✅ .env configured
- ✅ All files created
- ✅ Dependencies installed

---

### Step 5: Run & Test! (1 min)

```bash
npm run dev
```

**Then:**
1. Open: http://localhost:5173
2. Navigate to: http://localhost:5173/#admin
3. Click **"Add Team Member"**
4. Fill form & upload photo
5. Go back to homepage
6. Scroll down → See your team member! 🎉

---

## 🎯 Quick Test

**Upload your first team member:**
1. Name: `John Doe`
2. Role: `CEO & Founder`
3. Photo: Any JPG/PNG under 5MB
4. Click **Add Team Member**
5. Wait for "Success!" message
6. Refresh homepage → Photo appears!

---

## 📍 Important URLs

- **Homepage**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/#admin
- **Supabase Dashboard**: https://supabase.com/dashboard
- **Storage Bucket**: Your dashboard → Storage → team-photos
- **Database Tables**: Your dashboard → Table Editor → team_members

---

## ⚠️ Troubleshooting

**"Failed to upload"**
- Check .env credentials are correct
- Verify storage bucket exists and is public

**"Failed to save to database"**
- Run SUPABASE-DATABASE-SETUP.sql again
- Check table policies allow INSERT

**Image doesn't show**
- Check browser console for errors
- Verify image URL in database table
- Check storage bucket is public

**"Supabase credentials not found"**
- Make sure .env file exists
- Restart dev server after creating .env

---

## 🔐 Before Production

**IMPORTANT**: Current setup allows anyone to upload (for testing only)

**Add authentication:**
1. Enable Supabase Auth in your project
2. Create admin login page
3. Update RLS policies to check auth
4. Protect admin routes

See [UPLOAD-SYSTEM-GUIDE.md](UPLOAD-SYSTEM-GUIDE.md) for security setup.

---

## 📚 Full Documentation

- **Complete Guide**: [UPLOAD-SYSTEM-GUIDE.md](UPLOAD-SYSTEM-GUIDE.md)
- **Supabase Setup**: [SUPABASE-SETUP.md](SUPABASE-SETUP.md)
- **Database Schema**: [SUPABASE-DATABASE-SETUP.sql](SUPABASE-DATABASE-SETUP.sql)

---

## ✅ Success Checklist

- [ ] .env file created with Supabase credentials
- [ ] Database tables created via SQL script
- [ ] Storage bucket "team-photos" created and public
- [ ] Dev server running (npm run dev)
- [ ] Admin page accessible at /#admin
- [ ] Test upload successful
- [ ] Team member appears on homepage

---

🎊 **All done? Start uploading team photos!** Visit http://localhost:5173/#admin
