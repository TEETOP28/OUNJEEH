# Supabase Image Storage Setup Guide

## Overview
Your landing page now supports dynamic image loading from Supabase Storage! This allows you to update images without redeploying your site.

## 1️⃣ Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Project Name**: `ounjeeh-landing-page` (or your preference)
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project" (takes ~2 minutes)

## 2️⃣ Get Your Credentials

1. In your Supabase project dashboard, click the **Settings** (⚙️) icon
2. Navigate to **API** section
3. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (starts with `eyJhbGc...`)

## 3️⃣ Add Credentials to Your Project

1. Create a `.env` file in your project root:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Important**: Add `.env` to `.gitignore` (already done)

## 4️⃣ Create Storage Buckets

In Supabase Dashboard:

1. Click **Storage** in the left sidebar
2. Click **New bucket**
3. Create these buckets:

### Bucket: `team-photos`
- **Name**: `team-photos`
- **Public**: ✅ Yes (check the box)
- **File size limit**: 5MB
- **Allowed MIME types**: `image/*`

### Bucket: `testimonials`
- **Name**: `testimonials`
- **Public**: ✅ Yes
- **File size limit**: 5MB
- **Allowed MIME types**: `image/*`

### Bucket: `gallery`
- **Name**: `gallery`
- **Public**: ✅ Yes
- **File size limit**: 10MB
- **Allowed MIME types**: `image/*`

### Bucket: `hero-images`
- **Name**: `hero-images`
- **Public**: ✅ Yes
- **File size limit**: 10MB
- **Allowed MIME types**: `image/*`

## 5️⃣ Upload Images

### Method 1: Via Supabase Dashboard (Easiest)

1. Go to **Storage** → Select a bucket
2. Click **Upload file**
3. Select your images
4. Images are now live!

### Method 2: Organize with Folders

You can create folders in buckets:
```
team-photos/
  ├── leadership/
  │   ├── ceo.jpg
  │   └── cto.jpg
  └── staff/
      ├── member1.jpg
      └── member2.jpg
```

### Image Naming Best Practices

✅ **Good Names:**
- `team-ceo-john-doe.jpg`
- `testimonial-sarah-johnson.jpg`
- `gallery-product-rice-bags.jpg`

❌ **Avoid:**
- Spaces: `team member.jpg`
- Special chars: `team#1@photo.jpg`
- Too generic: `img1.jpg`, `photo.jpg`

## 6️⃣ Using Images in Your Components

### Example 1: Team Section

```tsx
import { TeamSection } from './components/TeamSection';

// In your App.tsx
<TeamSection />
```

The component automatically:
- Loads images from Supabase `team-photos` bucket
- Falls back to local images if Supabase isn't configured
- Shows loading states

### Example 2: Custom Component with Supabase

```tsx
import { useSupabaseImages } from './hooks/useSupabaseImages';

export const GallerySection = () => {
  const { images, loading } = useSupabaseImages({
    bucket: 'gallery',
    folder: 'products',
    fallbackImages: ['/images/product1.jpg', '/images/product2.jpg']
  });

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image) => (
        <img key={image.name} src={image.url} alt={image.name} />
      ))}
    </div>
  );
};
```

### Example 3: Single Image with Fallback

```tsx
import { useSupabaseImage } from './hooks/useSupabaseImages';

export const HeroSection = () => {
  const heroImage = useSupabaseImage(
    'hero-images',
    'main-hero.jpg',
    '/images/hero-fallback.jpg'
  );

  return <img src={heroImage} alt="Hero" />;
};
```

## 7️⃣ Recommended Folder Structure

```
Supabase Storage Buckets:
├── team-photos/
│   ├── leadership/
│   │   ├── ceo.jpg
│   │   └── cfo.jpg
│   └── team/
│       ├── member1.jpg
│       └── member2.jpg
│
├── testimonials/
│   ├── customer1.jpg
│   ├── customer2.jpg
│   └── customer3.jpg
│
├── gallery/
│   ├── products/
│   │   ├── rice.jpg
│   │   ├── beans.jpg
│   │   └── garri.jpg
│   └── farm/
│       ├── harvest.jpg
│       └── facility.jpg
│
└── hero-images/
    ├── main-hero.jpg
    └── about-hero.jpg
```

## 8️⃣ Image Optimization Tips

### Before Uploading:
1. **Compress images**: Use [TinyPNG](https://tinypng.com) or [Squoosh](https://squoosh.app)
2. **Recommended sizes**:
   - Team photos: 400x400px
   - Testimonial photos: 300x300px
   - Hero images: 1920x1080px
   - Gallery images: 800x600px
3. **Format**: Use WebP or JPG (PNG for logos with transparency)

### In Supabase:
- Supabase automatically serves images via CDN
- Images are cached globally for fast loading

## 9️⃣ Testing Your Setup

1. **Restart your dev server**:
   ```bash
   npm run dev
   ```

2. **Check console**: Should see no Supabase errors

3. **Test upload**: Upload one image to `team-photos` bucket

4. **Verify**: Image should appear on your site automatically!

## 🔟 Updating Images (No Code Changes!)

### To Update an Image:
1. Go to Supabase Dashboard → Storage
2. Select the bucket
3. Delete old image or upload new one with same name
4. Your site updates automatically! ✨

### To Add New Images:
1. Upload to appropriate bucket
2. Name clearly (e.g., `team-new-member.jpg`)
3. Image appears automatically in your components

## 🚀 Deployment Notes

### Environment Variables in Production:

**Netlify:**
1. Go to Site settings → Build & deploy → Environment
2. Add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

**Vercel:**
1. Go to Project Settings → Environment Variables
2. Add the same variables

**Other Platforms:**
- Add environment variables in your platform's settings
- Variables must start with `VITE_` for Vite projects

## 🔒 Security Notes

✅ **Safe to commit:**
- `.env.example`
- Supabase client code
- Public bucket URLs

❌ **Never commit:**
- `.env` file (contains your keys)
- Service role keys (only use anon keys in frontend)

## 📊 Storage Limits

**Supabase Free Tier:**
- Storage: 1GB
- Bandwidth: 2GB/month
- File uploads: Up to 50MB per file

**Paid Tier ($25/month):**
- Storage: 100GB
- Bandwidth: 200GB/month
- Larger file sizes supported

## 🆘 Troubleshooting

### Images not loading?
1. ✅ Check `.env` file exists with correct credentials
2. ✅ Verify buckets are set to **Public**
3. ✅ Restart dev server after adding `.env`
4. ✅ Check browser console for errors

### "Supabase credentials not found" warning?
- Normal if you haven't set up Supabase yet
- Site will use fallback images

### Upload fails?
- Check file size (< 5MB for photos)
- Verify bucket exists and is public
- Check file format is allowed (jpg, png, webp)

## 📞 Need Help?

- Supabase Docs: [https://supabase.com/docs](https://supabase.com/docs)
- Community: [https://discord.supabase.com](https://discord.supabase.com)

## ✨ Next Steps

1. ✅ Set up Supabase project
2. ✅ Add credentials to `.env`
3. ✅ Create buckets
4. ✅ Upload your first images
5. ✅ Test locally
6. ✅ Deploy with environment variables
7. 🎉 Enjoy easy image management!
