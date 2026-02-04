# OUNJEEH Image Upload Setup - Interactive Guide

Write-Host ""
Write-Host "🚀 OUNJEEH Image Upload System - Setup Guide" -ForegroundColor Green
Write-Host ""

# Step 1: Check .env
Write-Host "📝 STEP 1: Supabase Configuration" -ForegroundColor Cyan
Write-Host ""

if (Test-Path ".env") {
    $envContent = Get-Content ".env" -Raw
    if ($envContent -match "your-project-url") {
        Write-Host "⚠️  Please update .env with your Supabase credentials" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "1. Go to https://supabase.com/dashboard" -ForegroundColor White
        Write-Host "2. Settings → API" -ForegroundColor White
        Write-Host "3. Copy Project URL and anon key to .env" -ForegroundColor White
        Write-Host ""
        $open = Read-Host "Open .env now? (y/n)"
        if ($open -eq "y") {
            notepad .env
        }
    } else {
        Write-Host "✅ .env configured" -ForegroundColor Green
    }
} else {
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Created .env - Please configure it" -ForegroundColor Green
}

# Step 2: Database
Write-Host ""
Write-Host "📊 STEP 2: Database Setup" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Go to Supabase Dashboard → SQL Editor" -ForegroundColor White
Write-Host "2. Open and copy SUPABASE-DATABASE-SETUP.sql" -ForegroundColor White
Write-Host "3. Paste and Run in SQL Editor" -ForegroundColor White
Write-Host ""
$open = Read-Host "Open SQL file? (y/n)"
if ($open -eq "y") {
    notepad "SUPABASE-DATABASE-SETUP.sql"
}

# Step 3: Storage
Write-Host ""
Write-Host "💾 STEP 3: Create Storage Bucket" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Supabase Dashboard → Storage" -ForegroundColor White
Write-Host "2. New bucket: 'team-photos'" -ForegroundColor White
Write-Host "3. Make it Public ✅" -ForegroundColor White

# Step 4: Files
Write-Host ""
Write-Host "📁 STEP 4: Verifying Files" -ForegroundColor Cyan
Write-Host ""

$files = @(
    "lib\imageUpload.ts",
    "components\ImageUploadForm.tsx",
    "components\TeamSection.tsx",
    "AdminPage.tsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file missing" -ForegroundColor Red
    }
}

# Step 5: Start
Write-Host ""
Write-Host "🚀 STEP 5: Start Server" -ForegroundColor Cyan
Write-Host ""
Write-Host "Run: npm run dev" -ForegroundColor White
Write-Host "Then visit: http://localhost:5173/#admin" -ForegroundColor Blue
Write-Host ""
Write-Host "✨ Setup complete! See QUICK-START.md for details" -ForegroundColor Green
Write-Host ""
