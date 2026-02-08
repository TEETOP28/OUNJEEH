# Setup Inquiries Database Table

## Overview
This guide will help you set up the database table in Supabase to store customer inquiries and orders from your website.

## Steps to Setup

### 1. Open Supabase SQL Editor
1. Go to your Supabase project dashboard: https://supabase.com/dashboard/
2. Select your project
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**

### 2. Run the SQL Script
1. Open the file `CREATE-INQUIRIES-TABLE.sql` in your project
2. Copy all the SQL code
3. Paste it into the SQL Editor
4. Click **Run** or press `Ctrl+Enter`

### 3. Verify the Table
After running the script, verify that the table was created:
1. Click on **Table Editor** in the left sidebar
2. You should see a new table called `inquiries`
3. The table should have these columns:
   - `id` (UUID, Primary Key)
   - `name` (Text)
   - `email` (Text)
   - `phone` (Text)
   - `state` (Text)
   - `city` (Text)
   - `message` (Text, Optional)
   - `mode` (Text - "order" or "inquiry")
   - `product_name` (Text, Optional)
   - `created_at` (Timestamp)

### 4. Test the Setup
1. Go to your website
2. Click "Order on WhatsApp" on any product
3. Fill out the form with the location dropdowns
4. Submit the form
5. Check your Supabase table - you should see the new entry

### 5. View Your Data
To view all submitted inquiries:
1. Go to **Table Editor** in Supabase
2. Click on the `inquiries` table
3. You'll see all customer inquiries and orders with their location information

## Security Features
- ✅ **Row Level Security (RLS)** is enabled
- ✅ Public users can only INSERT data (submit forms)
- ✅ Only authenticated users can READ the data (admins only)

## What Changed
- ❌ **Removed**: Google Sheets integration
- ✅ **Added**: Supabase database storage
- ✅ **Added**: State and City dropdown fields
- ✅ **Added**: Location data for all Nigerian states and cities
- ✅ **Enhanced**: WhatsApp message now includes customer location

## Location Data
The form now includes dropdowns for:
- **36 Nigerian States + FCT** (Abuja)
- **Cities/Areas** for each state (dynamically populated based on selected state)

Examples:
- Ogun State → Ilishan Remo, Abeokuta, Ijebu Ode, Sagamu, etc.
- Lagos State → Ikeja, Lekki, Victoria Island, Ikorodu, etc.
- FCT → Abuja, Gwagwalada, Kubwa, Kuje, etc.

## Troubleshooting

### Error: "relation 'inquiries' does not exist"
- Make sure you ran the SQL script in step 2
- Verify the table exists in Table Editor

### Error: "new row violates row-level security policy"
- Make sure you ran the entire SQL script including the RLS policies
- The script includes a policy for anonymous inserts

### Form not submitting
- Check browser console for errors
- Verify your Supabase credentials in `.env` file
- Make sure the `inquiries` table exists

## Next Steps
- Access your Supabase dashboard to view all submitted inquiries
- Export data to Excel/CSV from the Table Editor
- Set up email notifications when new inquiries come in (optional)
