"use client";

import React, { useState } from 'react';
import removeBackground from '@imgly/background-removal';

export default function BackgroundRemover() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset states and show preview
    const originalUrl = URL.createObjectURL(file);
    setImageUrl(originalUrl);
    setResultUrl(null);
    setIsProcessing(true);

    try {
      // The heavy lifting happens here
      const blob = await removeBackground(file, {
        progress: (status, progress) => {
          console.log(`Progress: ${status} - ${Math.round(progress * 100)}%`);
        }
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
    } catch (error) {
      console.error("Background removal failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl w-full bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">AI Background Remover</h1>

        <div className="flex flex-col items-center gap-4">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          {isProcessing && (
            <div className="animate-pulse text-blue-600 font-medium">
              Removing background... (this may take a moment)
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {imageUrl && (
              <div>
                <p className="text-sm text-gray-500 mb-2 text-center">Original</p>
                <img src={imageUrl} alt="Original" className="rounded-lg border" />
              </div>
            )}
            
            {resultUrl && (
              <div>
                <p className="text-sm text-gray-500 mb-2 text-center">Processed</p>
                <img src={resultUrl} alt="No Background" className="rounded-lg border bg-[url('https://www.transparenttextures.com/patterns/checkerboard.png')]" />
                <a 
                  href={resultUrl} 
                  download="removed-bg.png"
                  className="mt-4 block text-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                >
                  Download Result
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}