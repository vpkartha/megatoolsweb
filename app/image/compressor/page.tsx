"use client";
import BackToHome from "@/components/BackToHome";
import FeedbackForm from "@/components/FeedbackForm";
import ToolLayout from "@/components/ToolLayout";
import { useRef, useState } from "react";

export default function ImageCompressor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [quality, setQuality] = useState(70);
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalSize(file.size);

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      setImage(img);
      setPreview(img.src);
    };
  };

  const compressImage = () => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);

    // Compress as JPEG
    const compressedDataUrl = canvas.toDataURL(
      "image/jpeg",
      quality / 100
    );

    // Convert base64 size
    const base64Length = compressedDataUrl.length - "data:image/jpeg;base64,".length;
    const sizeInBytes = (base64Length * 3) / 4;

    setCompressedSize(sizeInBytes);
    setPreview(compressedDataUrl);
  };

  const downloadImage = () => {
    if (!preview) return;

    const link = document.createElement("a");
    link.href = preview;
    link.download = "compressed-image.jpg";
    link.click();
  };

  const formatSize = (bytes: number | null) => {
    if (!bytes) return "-";
    return (bytes / 1024).toFixed(2) + " KB";
  };

  return (
    <ToolLayout>

      <h1 className="text-3xl font-bold mb-2">Image Compressor</h1>
      <p className="text-gray-600 mb-6">
        Reduce image size without losing much quality.
      </p>

      {/* Upload */}
      <label className="inline-block cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
        Choose Image
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
      </label>

      {/* Preview */}
      {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="preview"
            className="max-w-full border rounded"
          />
        </div>
      )}

      {/* Quality Slider */}
      <div className="mt-4">
        <label className="text-sm font-medium">
          Quality: {quality}%
        </label>

        <input
          type="range"
          min="10"
          max="100"
          value={quality}
          onChange={(e) => setQuality(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={compressImage}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Compress
        </button>

        <button
          onClick={downloadImage}
          className="border px-4 py-2 rounded hover:bg-gray-100"
        >
          Download
        </button>
      </div>

      {/* Stats */}
      <div className="mt-6 p-4 border rounded bg-gray-50 space-y-2">
        <p>Original Size: <b>{formatSize(originalSize)}</b></p>
        <p>Compressed Size: <b>{formatSize(compressedSize)}</b></p>
      </div>

      {/* Hidden canvas */}
      <canvas ref={canvasRef} className="hidden" />
        <FeedbackForm tool="percentage-calculator" />
        <BackToHome />
    </ToolLayout>
  );
}