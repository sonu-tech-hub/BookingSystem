import React, { useState } from 'react';

const ImageUpload = ({ onUpload }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const CLOUD_NAME = 'your_cloud_name'; // Replace with your Cloudinary cloud name
  const UPLOAD_PRESET = 'your_upload_preset'; // Replace with your Cloudinary upload preset

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', UPLOAD_PRESET);
        formData.append('cloud_name', CLOUD_NAME);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const data = await response.json();
        return {
          url: data.secure_url,
          publicId: data.public_id
        };
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setUploadedImages(prev => [...prev, ...uploadedUrls]);
      onUpload(uploadedUrls.map(img => img.url));
    } catch (err) {
      setError('Failed to upload images. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (indexToRemove) => {
    setUploadedImages(prev => {
      const newImages = prev.filter((_, index) => index !== indexToRemove);
      onUpload(newImages.map(img => img.url));
      return newImages;
    });
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Images
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
          disabled={loading}
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm mb-4">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-blue-500 text-sm mb-4">
          Uploading images...
        </div>
      )}

      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {uploadedImages.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image.url}
                alt={`Uploaded ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1
                         opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;