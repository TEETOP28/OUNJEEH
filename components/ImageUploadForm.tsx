import React, { useState } from 'react';
import { Button } from './Button';
import { uploadImageToStorage, saveTeamMember } from '../lib/imageUpload';

interface ImageUploadFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export const ImageUploadForm: React.FC<ImageUploadFormProps> = ({ 
  onSuccess, 
  onClose 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    file: null as File | null
  });
  const [preview, setPreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, file });
      
      // Generate preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.name || !formData.role || !formData.file) {
      setError('Please fill all fields and select an image');
      return;
    }

    setUploading(true);

    try {
      // Step 1: Upload image to Supabase Storage
      const uploadResult = await uploadImageToStorage(
        formData.file,
        'OUNJEEH STAPLES',
        'members'
      );

      if (!uploadResult.success) {
        setError(uploadResult.error || 'Upload failed');
        setUploading(false);
        return;
      }

      // Step 2: Save to database
      const dbResult = await saveTeamMember({
        name: formData.name,
        role: formData.role,
        imagePath: uploadResult.imagePath!,
        imageUrl: uploadResult.imageUrl!
      });

      if (!dbResult.success) {
        setError(dbResult.error || 'Failed to save to database');
        setUploading(false);
        return;
      }

      // Success!
      setSuccess('Team member added successfully!');
      setFormData({ name: '', role: '', file: null });
      setPreview('');
      
      if (onSuccess) {
        setTimeout(() => onSuccess(), 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-8 bg-white rounded-3xl shadow-xl">
      <h2 className="text-3xl font-serif font-bold text-demmy-green mb-6">
        Add Team Member
      </h2>

      {/* Name Input */}
      <div>
        <label className="block text-sm font-bold text-demmy-green mb-2">
          Full Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-demmy-green focus:ring-2 focus:ring-demmy-green/20 outline-none"
          placeholder="e.g. John Doe"
          required
        />
      </div>

      {/* Role Input */}
      <div>
        <label className="block text-sm font-bold text-demmy-green mb-2">
          Role/Position *
        </label>
        <input
          type="text"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-demmy-green focus:ring-2 focus:ring-demmy-green/20 outline-none"
          placeholder="e.g. CEO & Founder"
          required
        />
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-bold text-demmy-green mb-2">
          Photo *
        </label>
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileChange}
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-demmy-green focus:ring-2 focus:ring-demmy-green/20 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-demmy-light file:text-demmy-green hover:file:bg-demmy-green/10"
          required
        />
        <p className="text-xs text-slate-500 mt-1">
          Max 5MB. Formats: JPG, PNG, WebP
        </p>
      </div>

      {/* Image Preview */}
      {preview && (
        <div className="mt-4">
          <p className="text-sm font-bold text-demmy-green mb-2">Preview:</p>
          <img
            src={preview}
            alt="Preview"
            className="w-48 h-48 rounded-full object-cover mx-auto border-4 border-demmy-light"
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
          <p className="text-green-600 text-sm font-bold">{success}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex gap-3">
        <Button
          variant="primary"
          className="flex-1 py-4 rounded-xl"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Add Team Member'}
        </Button>
        
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-4 rounded-xl border-2 border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors font-semibold"
            disabled={uploading}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
