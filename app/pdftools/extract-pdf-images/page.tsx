"use client";

import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";
import { Upload, ImageIcon, Download, FileText } from "lucide-react";

export default function ExtractPDFImages() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setImages([]);
    } else {
      alert("Please select a valid PDF file");
    }
  };

  const extractImages = async () => {
    if (!selectedFile) return;

    setExtracting(true);

    // Simulated extraction delay
    setTimeout(() => {
      setImages([
        "https://via.placeholder.com/300x200?text=Image+1",
        "https://via.placeholder.com/300x200?text=Image+2",
        "https://via.placeholder.com/300x200?text=Image+3",
      ]);

      setExtracting(false);
    }, 2000);
  };

  const reset = () => {
    setSelectedFile(null);
    setImages([]);
    setExtracting(false);
  };

  return (
    <ToolLayout tool="extract-pdf-images">
    
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            Extract Images from PDF
          </h1>

          <p className="text-gray-600">
            Upload a PDF file and extract all embedded images instantly.
          </p>
        </div>

        {/* Upload Card */}
        <div className="border border-gray-200 rounded-2xl p-8 bg-white shadow-sm mb-6">

          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-10 bg-gray-50 hover:bg-gray-100 transition">

            <Upload className="w-14 h-14 text-blue-600 mb-4" />

            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Upload PDF File
            </h2>

            <p className="text-sm text-gray-500 mb-5 text-center">
              Drag & drop your PDF here or click below to browse.
            </p>

            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition font-medium">
              Choose PDF

              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* Selected File */}
          {selectedFile && (
            <div className="mt-6 flex items-center justify-between border rounded-xl p-4 bg-gray-50">

              <div className="flex items-center gap-3">
                <FileText className="text-red-500 w-8 h-8" />

                <div>
                  <p className="font-medium text-gray-800">
                    {selectedFile.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={extractImages}
                  disabled={extracting}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl transition disabled:opacity-50"
                >
                  {extracting ? "Extracting..." : "Extract Images"}
                </button>

                <button
                  onClick={reset}
                  className="border border-gray-300 hover:bg-gray-100 px-5 py-2 rounded-xl transition"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {images.length > 0 && (
          <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">

            <div className="flex items-center gap-2 mb-6">
              <ImageIcon className="text-blue-600" />

              <h2 className="text-2xl font-semibold text-gray-800">
                Extracted Images
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="border rounded-2xl overflow-hidden bg-gray-50 hover:shadow-md transition"
                >
                  <img
                    src={img}
                    alt={`Extracted ${index + 1}`}
                    className="w-full h-52 object-cover"
                  />

                  <div className="p-4 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700">
                      Image {index + 1}
                    </p>

                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </ToolLayout>
  );
}