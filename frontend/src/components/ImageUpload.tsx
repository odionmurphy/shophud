import React, { useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import "./ImageUpload.css";

interface ImageUploadProps {
  onImageSelect: (imageUrl: string) => void;
  currentImage?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  currentImage,
}) => {
  const [preview, setPreview] = useState<string>(currentImage || "");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPreview(result);
      onImageSelect(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="image-upload-wrapper">
      {/* Preview */}
      {preview && (
        <div className="image-preview">
          <img src={preview} alt="Preview" className="preview-image" />
          <button
            type="button"
            onClick={() => {
              setPreview("");
              onImageSelect("");
            }}
            className="preview-remove-btn"
          >
            <FiX size={18} />
          </button>
        </div>
      )}

      {/* Upload Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`upload-dropzone ${isDragging ? "drag-active" : ""}`}
      >
        <FiUpload className="upload-icon" />
        <p className="upload-text">Drag and drop your image here</p>
        <p className="upload-divider">or</p>
        <label className="upload-label">
          <span className="upload-btn">Choose Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="upload-input"
          />
        </label>
        <p className="upload-formats">Supported formats: JPG, PNG, GIF, WebP</p>
      </div>
    </div>
  );
};
