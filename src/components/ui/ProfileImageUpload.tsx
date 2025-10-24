import React, { useRef, useState } from 'react';

export default function ProfileImageUpload({ onImageChange }: { onImageChange: (file: File) => void }) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onImageChange(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 mt-4">
      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-400 bg-gray-100 dark:bg-gray-800">
        {preview ? (
          <img src={preview} alt="Preview" className="object-cover w-full h-full" />
        ) : (
          <span className="flex items-center justify-center w-full h-full text-gray-400">Sin imagen</span>
        )}
      </div>
      <button
        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        onClick={() => fileInputRef.current?.click()}
        type="button"
      >
        Cambiar imagen
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}