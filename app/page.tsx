'use client'

import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';


export default function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDrop = (acceptedFiles) => {
    setLoading(true);
    const updatedImages = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setTimeout(() => {
      setImages((prevImages) => [...prevImages, ...updatedImages]);
      setLoading(false);
    }, 2000); // Simulating a 2-second delay for image upload
  };

  const handleRemove = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop, accept: 'image/*', multiple: true });

  useEffect(() => {
    return () => {
      // Clean up the created object URLs when the component unmounts
      images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  const dropzoneStyle = {
    border: '2px dashed #FFFFFF',
    borderRadius: '10px',
    padding: '40px',
    margin: '20px',
    background: loading ? 'linear-gradient(to right, #FCA5A5, #F59E0B)' : 'linear-gradient(to right, #9F7AEA, #17C3B2)',
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Multi-Image Upload</h1>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        {loading ? (
          <p className="text-gray-600">Uploading...</p>
        ) : (
          <p className="text-gray-600">Drag and drop some files here, or click to select files</p>
        )}
      </div>
      <div className="flex flex-wrap">
        {images.map((image, index) => (
          <div key={index} className="mr-4 mb-4">
            <img src={image.preview} alt={`Preview ${index}`} className="w-48 h-48 object-cover rounded" />
            <button
              className="bg-red-500 text-white px-2 py-1 rounded mt-2 hover:bg-red-600"
              onClick={() => handleRemove(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
