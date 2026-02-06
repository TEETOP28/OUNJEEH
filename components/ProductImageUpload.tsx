import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import { uploadImageToStorage } from '../lib/imageUpload';

interface ProductImageUploadProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export const ProductImageUpload: React.FC<ProductImageUploadProps> = ({ 
  onSuccess, 
  onClose 
}) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Generate preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedProduct || !file) {
      setError('Please select a product and choose an image');
      return;
    }

    setUploading(true);

    try {
      // Get product details
      const product = PRODUCTS.find(p => p.id === selectedProduct);
      if (!product) {
        setError('Product not found');
        setUploading(false);
        return;
      }

      // Upload image to Supabase Storage
      const uploadResult = await uploadImageToStorage(
        file,
        'OUNJEEH STAPLES',
        'products'
      );

      if (!uploadResult.success) {
        setError(uploadResult.error || 'Upload failed');
        setUploading(false);
        return;
      }

      // Save to database (this makes it permanent!)
      const { saveProductImage } = await import('../lib/imageUpload');
      const dbResult = await saveProductImage({
        productId: selectedProduct,
        productName: product.name,
        imagePath: uploadResult.imagePath!,
        imageUrl: uploadResult.imageUrl!,
        isPrimary: true
      });

      if (!dbResult.success) {
        setError('Image uploaded but failed to save to database: ' + dbResult.error);
        setUploading(false);
        return;
      }

      setSuccess('Product image uploaded successfully! Refresh the page to see changes.');
      
      // Reset form
      setSelectedProduct('');
      setFile(null);
      setPreview('');
      
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 2000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-demmy-green">Upload Product Image</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-demmy-green transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Selection */}
        <div>
          <label className="block text-sm font-bold text-demmy-green mb-3 uppercase tracking-wider">
            Select Product
          </label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-demmy-green/20 focus:border-demmy-green focus:outline-none transition-colors"
            required
          >
            <option value="">Choose a product...</option>
            {PRODUCTS.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} ({product.localName})
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-bold text-demmy-green mb-3 uppercase tracking-wider">
            Product Photo
          </label>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-demmy-green/20 focus:border-demmy-green focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-demmy-light file:text-demmy-green hover:file:bg-demmy-green hover:file:text-white"
            required
          />
          <p className="text-xs text-slate-500 mt-2">
            Accepted formats: JPG, PNG, WebP (Max 5MB)
          </p>
        </div>

        {/* Preview */}
        {preview && (
          <div className="mt-4">
            <p className="text-sm font-bold text-demmy-green mb-3 uppercase tracking-wider">
              Preview
            </p>
            <div className="w-full h-64 rounded-xl overflow-hidden bg-slate-100">
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={uploading}
            className="flex-1 inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-300 active:scale-95 text-center tracking-tight bg-demmy-green text-white hover:bg-demmy-light hover:text-demmy-green shadow-xl shadow-demmy-green/10 px-8 py-4"
          >
            {uploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : (
              'Upload Image'
            )}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-300 active:scale-95 text-center tracking-tight bg-demmy-gold text-demmy-green hover:bg-demmy-forest hover:text-white border-2 border-demmy-gold shadow-lg shadow-demmy-gold/20 px-8 py-4"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Instructions */}
      <div className="mt-8 p-6 bg-demmy-light/30 rounded-xl border border-demmy-green/10">
        <h3 className="font-bold text-demmy-green mb-3 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Tips for Best Results
        </h3>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>• Use high-quality photos with good lighting</li>
          <li>• Photos should be clear and show the product prominently</li>
          <li>• Recommended size: At least 800x800 pixels</li>
          <li>• Square or landscape orientation works best</li>
        </ul>
      </div>
    </div>
  );
};
