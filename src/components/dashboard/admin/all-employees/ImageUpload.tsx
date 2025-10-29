"use client";

import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2, UploadCloud } from "lucide-react";

const ImageUpload = ({url,setUrl}:any) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "react_uploads");
    formData.append("cloud_name", "dnwum54te");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dnwum54te/image/upload",
        formData
      );
      setUrl(response.data.secure_url);
    } catch (error) {
      console.error(error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-6 cursor-pointer hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-400/10 transition"
      >
        <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
        <p className="text-gray-500">click to upload or Browse</p>
        <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 2MB</p>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* Loader */}
      {uploading && (
        <div className="flex justify-center items-center mt-6">
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin mr-2" />
          <p className="text-gray-600">Uploading image...</p>
        </div>
      )}

      {/* Preview before upload */}
      {preview && !uploading && !url && (
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-sm text-gray-500 mb-2">Preview:</p>
          <img
            src={preview}
            alt="preview"
            className="w-full h-56 object-cover rounded-xl border border-border shadow-sm"
          />
        </motion.div>
      )}

      {/* Uploaded image */}
      {url && (
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-sm text-teal-500 mb-2">Uploaded successfully</p>
          <img
            src={url}
            alt="uploaded"
            className="w-full h-56 object-cover rounded-xl border border-border shadow-sm"
          />
        </motion.div>
      )}
    </div>
  );
};

export default ImageUpload;
