// Setup Verification Script for OUNJEEH Image Upload System
// Run with: node setup-check.js

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('\n🔍 OUNJEEH Image Upload System - Setup Verification\n');
console.log('='.repeat(60));

let allGood = true;

// Check 1: .env file
console.log('\n1️⃣  Checking .env file...');
const envPath = join(__dirname, '.env');
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf8');
  const hasUrl = envContent.includes('VITE_SUPABASE_URL=') && !envContent.includes('your-project-url');
  const hasKey = envContent.includes('VITE_SUPABASE_ANON_KEY=') && !envContent.includes('your-anon-key');
  
  if (hasUrl && hasKey) {
    console.log('   ✅ .env file configured');
  } else {
    console.log('   ⚠️  .env exists but needs configuration');
    console.log('   → Update VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
    allGood = false;
  }
} else {
  console.log('   ❌ .env file not found');
  console.log('   → Copy .env.example to .env and add your Supabase credentials');
  allGood = false;
}

// Check 2: Required files
console.log('\n2️⃣  Checking required files...');
const requiredFiles = [
  'lib/imageUpload.ts',
  'components/ImageUploadForm.tsx',
  'components/TeamSection.tsx',
  'AdminPage.tsx',
  'SUPABASE-DATABASE-SETUP.sql'
];

requiredFiles.forEach(file => {
  const filePath = join(__dirname, file);
  if (existsSync(filePath)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} missing`);
    allGood = false;
  }
});

// Check 3: Dependencies
console.log('\n3️⃣  Checking package.json dependencies...');
const packagePath = join(__dirname, 'package.json');
if (existsSync(packagePath)) {
  const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
  const hasSupabase = packageJson.dependencies?.['@supabase/supabase-js'];
  
  if (hasSupabase) {
    console.log(`   ✅ @supabase/supabase-js installed (${hasSupabase})`);
  } else {
    console.log('   ❌ @supabase/supabase-js not installed');
    console.log('   → Run: npm install @supabase/supabase-js');
    allGood = false;
  }
}

// Summary
console.log('\n' + '='.repeat(60));
if (allGood) {
  console.log('\n✅ All checks passed! Ready for Supabase setup.\n');
  console.log('📋 Next steps:');
  console.log('   1. Go to https://supabase.com/dashboard');
  console.log('   2. Create/select your project');
  console.log('   3. Run SQL from SUPABASE-DATABASE-SETUP.sql');
  console.log('   4. Create "team-photos" storage bucket (make it public)');
  console.log('   5. Run: npm run dev');
  console.log('   6. Visit: http://localhost:5173/#admin\n');
} else {
  console.log('\n⚠️  Some checks failed. Please fix the issues above.\n');
}
