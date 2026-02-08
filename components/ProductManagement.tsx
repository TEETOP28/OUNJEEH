import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { uploadImageToStorage } from '../lib/imageUpload';

interface Product {
  id: string;
  product_id: string;
  product_name: string;
  description?: string;
  category?: string;
  price?: number;
  stock_status?: string;
  image_url: string;
  image_path: string;
  created_at: string;
}

export const ProductManagement: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    product_name: '',
    description: '',
    category: 'grains',
    price: '',
    stock_status: 'in-stock'
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('product_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      setError('Failed to load products: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const resetForm = () => {
    setFormData({
      product_name: '',
      description: '',
      category: 'grains',
      price: '',
      stock_status: 'in-stock'
    });
    setFile(null);
    setPreview('');
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setUploading(true);

    try {
      let imageUrl = editingProduct?.image_url || '';
      let imagePath = editingProduct?.image_path || '';

      // Upload new image if file is selected
      if (file) {
        const uploadResult = await uploadImageToStorage(file, 'OUNJEEH STAPLES', 'products');
        
        if (!uploadResult.success) {
          throw new Error(uploadResult.error || 'Image upload failed');
        }
        
        imageUrl = uploadResult.imageUrl!;
        imagePath = uploadResult.imagePath!;

        // Delete old image if editing
        if (editingProduct?.image_path) {
          await supabase.storage
            .from('product-images')
            .remove([editingProduct.image_path]);
        }
      }

      const productData = {
        product_id: editingProduct?.product_id || `product_${Date.now()}`,
        product_name: formData.product_name,
        description: formData.description,
        category: formData.category,
        price: formData.price ? parseFloat(formData.price) : null,
        stock_status: formData.stock_status,
        image_url: imageUrl,
        image_path: imagePath,
        is_primary: true
      };

      if (editingProduct) {
        // Update existing product
        const { error } = await supabase
          .from('product_images')
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;
        setSuccess('Product updated successfully!');
      } else {
        // Create new product
        if (!file) {
          throw new Error('Please select an image for the new product');
        }

        const { error } = await supabase
          .from('product_images')
          .insert([productData]);

        if (error) throw error;
        setSuccess('Product created successfully!');
      }

      setTimeout(() => {
        resetForm();
        fetchProducts();
        setSuccess('');
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      product_name: product.product_name,
      description: product.description || '',
      category: product.category || 'grains',
      price: product.price?.toString() || '',
      stock_status: product.stock_status || 'in-stock'
    });
    setPreview(product.image_url);
    setShowForm(true);
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Are you sure you want to delete "${product.product_name}"?`)) {
      return;
    }

    try {
      setError('');
      
      // Delete image from storage
      await supabase.storage
        .from('product-images')
        .remove([product.image_path]);

      // Delete from database
      const { error } = await supabase
        .from('product_images')
        .delete()
        .eq('id', product.id);

      if (error) throw error;

      setSuccess('Product deleted successfully!');
      fetchProducts();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  if (showForm) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-demmy-green">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={resetForm}
            className="text-slate-400 hover:text-demmy-green transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
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
          {/* Product Name */}
          <div>
            <label className="block text-sm font-bold text-demmy-green mb-3 uppercase tracking-wider">
              Product Name *
            </label>
            <input
              type="text"
              value={formData.product_name}
              onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-demmy-green/20 focus:border-demmy-green focus:outline-none transition-colors"
              placeholder="e.g., Premium Honey Beans"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-demmy-green mb-3 uppercase tracking-wider">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-demmy-green/20 focus:border-demmy-green focus:outline-none transition-colors"
              placeholder="Describe your product..."
              rows={3}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-demmy-green mb-3 uppercase tracking-wider">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-demmy-green/20 focus:border-demmy-green focus:outline-none transition-colors"
            >
              <option value="grains">Premium Grains</option>
              <option value="processed">Authentic Flours</option>
              <option value="oils">Pure Harvest Oils</option>
              <option value="proteins">Dried Proteins</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-bold text-demmy-green mb-3 uppercase tracking-wider">
              Price (₦)
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-demmy-green/20 focus:border-demmy-green focus:outline-none transition-colors"
              placeholder="0.00"
              step="0.01"
            />
          </div>

          {/* Stock Status */}
          <div>
            <label className="block text-sm font-bold text-demmy-green mb-3 uppercase tracking-wider">
              Stock Status
            </label>
            <select
              value={formData.stock_status}
              onChange={(e) => setFormData({ ...formData, stock_status: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-demmy-green/20 focus:border-demmy-green focus:outline-none transition-colors"
            >
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-bold text-demmy-green mb-3 uppercase tracking-wider">
              Product Photo {!editingProduct && '*'}
            </label>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-demmy-green/20 focus:border-demmy-green focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-demmy-light file:text-demmy-green hover:file:bg-demmy-green hover:file:text-white"
              required={!editingProduct}
            />
            <p className="text-xs text-slate-500 mt-2">
              {editingProduct ? 'Upload a new image to replace the current one' : 'Accepted formats: JPG, PNG, WebP (Max 5MB)'}
            </p>
          </div>

          {/* Preview */}
          {preview && (
            <div>
              <p className="text-sm font-bold text-demmy-green mb-3 uppercase tracking-wider">
                Preview
              </p>
              <div className="w-full h-64 rounded-xl overflow-hidden bg-slate-100">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            </div>
          )}

          {/* Buttons */}
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
                  {editingProduct ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                editingProduct ? 'Update Product' : 'Create Product'
              )}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-300 active:scale-95 text-center tracking-tight bg-demmy-gold text-demmy-green hover:bg-demmy-forest hover:text-white border-2 border-demmy-gold shadow-lg shadow-demmy-gold/20 px-8 py-4"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-demmy-green">Product Management</h2>
          <p className="text-slate-600 mt-2">Create, edit, and manage your products</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 font-bold rounded-2xl transition-all duration-300 active:scale-95 bg-demmy-green text-white hover:bg-demmy-light hover:text-demmy-green shadow-xl shadow-demmy-green/10 px-6 py-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Product
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-demmy-green transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
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

      {loading ? (
        <div className="text-center py-12">
          <svg className="animate-spin h-12 w-12 mx-auto text-demmy-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-slate-600 mt-4">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="text-xl font-bold text-slate-400 mb-2">No products yet</h3>
          <p className="text-slate-500">Click "Add New Product" to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-slate-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-slate-100 hover:border-demmy-green">
              <div className="aspect-square overflow-hidden bg-white">
                <img
                  src={product.image_url}
                  alt={product.product_name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-demmy-green mb-1">{product.product_name}</h3>
                {product.description && (
                  <p className="text-sm text-slate-600 mb-2 line-clamp-2">{product.description}</p>
                )}
                <div className="flex items-center justify-between mb-3">
                  {product.price && (
                    <span className="text-demmy-green font-bold">₦{product.price.toLocaleString()}</span>
                  )}
                  {product.stock_status && (
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      product.stock_status === 'in-stock' ? 'bg-green-100 text-green-700' :
                      product.stock_status === 'low-stock' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {product.stock_status === 'in-stock' ? 'In Stock' :
                       product.stock_status === 'low-stock' ? 'Low Stock' : 'Out of Stock'}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-300 bg-demmy-green text-white hover:bg-demmy-light hover:text-demmy-green px-4 py-2 text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    className="flex-1 inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-300 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
