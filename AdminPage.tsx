import React, { useState } from 'react';
import { ProductImageUpload } from './components/ProductImageUpload';
import { ProductManagement } from './components/ProductManagement';
import { Button } from './components/Button';

export const AdminPage: React.FC = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showProductManagement, setShowProductManagement] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setShowUploadForm(false);
    setShowProductManagement(false);
    setRefreshKey(prev => prev + 1);
    // Optionally reload the page or refresh team section
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const handleClose = () => {
    setShowUploadForm(false);
    setShowProductManagement(false);
  };

  const handleBackToHome = () => {
    // Clear hash and reload to refresh products
    window.location.hash = '';
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-demmy-cream py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back to Home Button */}
          <div className="mb-8">
            <button
              onClick={handleBackToHome}
              className="inline-flex items-center gap-2 text-demmy-green hover:text-demmy-green/80 font-bold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Homepage
            </button>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-serif font-bold text-demmy-green mb-4">
              Admin Panel
            </h1>
            <p className="text-lg text-slate-600 mb-4">
              Upload product and staple images
            </p>
            <div className="inline-block bg-demmy-light/50 rounded-xl px-6 py-3 border border-demmy-green/20">
              <p className="text-sm text-demmy-green">
                📍 <strong>Access this page:</strong> Add <code className="bg-white px-2 py-1 rounded">#admin</code> to your website URL
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Example: yoursite.com<strong>#admin</strong>
              </p>
            </div>
          </div>

          {/* Action Cards */}
          {!showUploadForm && !showProductManagement && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <button
                onClick={() => setShowUploadForm(true)}
                className="group relative overflow-hidden bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 text-left border-2 border-transparent hover:border-demmy-green"
              >
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-demmy-light rounded-2xl flex items-center justify-center mb-4 group-hover:bg-demmy-green transition-colors">
                    <svg className="w-8 h-8 text-demmy-green group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-demmy-green mb-2">
                    Upload Product Images
                  </h3>
                  <p className="text-slate-600">
                    Replace stock photos with your actual product images
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-demmy-light/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button
                onClick={() => setShowProductManagement(true)}
                className="group relative overflow-hidden bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 text-left border-2 border-transparent hover:border-demmy-green"
              >
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-demmy-light rounded-2xl flex items-center justify-center mb-4 group-hover:bg-demmy-green transition-colors">
                    <svg className="w-8 h-8 text-demmy-green group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-demmy-green mb-2">
                    Manage Products
                  </h3>
                  <p className="text-slate-600">
                    Add, edit, or delete products with full control
                  </p>
                  <span className="inline-block mt-2 text-xs font-bold text-white bg-demmy-green px-3 py-1 rounded-full">
                    Create • Edit • Delete
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-demmy-light/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          )}

          {/* Upload Form */}
          {showUploadForm && (
            <div className="animate-fadeIn">
              <ProductImageUpload
                onSuccess={handleSuccess}
                onClose={handleClose}
              />
            </div>
          )}

          {/* Product Management */}
          {showProductManagement && (
            <div className="animate-fadeIn">
              <ProductManagement
                onClose={handleClose}
              />
            </div>
          )}

          {/* Instructions */}
          {!showUploadForm && !showProductManagement && (
            <div className="mt-12 bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-demmy-green mb-4">
                📝 Setup Instructions
              </h2>
              <ol className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-demmy-green text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div>
                    <strong>Create Supabase Account:</strong> Go to <a href="https://supabase.com" target="_blank" className="text-demmy-green hover:underline">supabase.com</a> and sign up
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-demmy-green text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div>
                    <strong>Get Credentials:</strong> Settings → API → Copy "Project URL" and "anon public" key
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-demmy-green text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div>
                    <strong>Update .env file:</strong> Paste credentials in your .env file
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-demmy-green text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div>
                    <strong>Create Storage:</strong> Supabase Dashboard → Storage → Create bucket named "product-images" (make it public)
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-demmy-green text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div>
                    <strong>Upload Images:</strong> Click "Upload Product Images" above and select a product!
                  </div>
                </li>
              </ol>
              
              <div className="mt-6 p-4 bg-demmy-light/30 rounded-xl">
                <p className="text-sm text-slate-600">
                  <strong>Note:</strong> Once you upload an image, it will automatically replace the stock photo for that product on your website.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
