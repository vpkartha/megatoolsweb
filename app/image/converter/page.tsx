"use client";
import ToolLayout from "@/components/ToolLayout"; 
import { useRef, useState } from "react";

export default function ImageConverter() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [format, setFormat] = useState("image/png");

  const [originalType, setOriginalType] = useState<string | null>(null);
  const [convertedSize, setConvertedSize] = useState<number | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalType(file.type);

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      setImage(img);
      setPreview(img.src);
      setConvertedSize(null);
    };
  };

  const convertImage = () => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);

    // Convert only supported formats
    const convertedDataUrl = canvas.toDataURL(format);

    // Approx file size calculation
    const base64Length =
      convertedDataUrl.length - convertedDataUrl.indexOf(",") - 1;

    const sizeInBytes = (base64Length * 3) / 4;

    setConvertedSize(sizeInBytes);
    setPreview(convertedDataUrl);
  };

  const downloadImage = () => {
    if (!preview) return;

    const link = document.createElement("a");

    const ext =
      format === "image/png"
        ? "png"
        : format === "image/jpeg"
        ? "jpg"
        : "webp";

    link.download = `converted-image.${ext}`;
    link.href = preview;
    link.click();
  };

  const formatSize = (bytes: number | null) => {
    if (!bytes) return "-";
    return (bytes / 1024).toFixed(2) + " KB";
  };

  return (
     <ToolLayout tool="image-converter">

      <h1 className="text-3xl font-bold mb-2">Image Converter</h1>
      <p className="text-gray-600 mb-6">
        Convert images between PNG, JPG, and WebP formats instantly.
      </p>

      {/* Upload Button */}
      <label className="inline-block cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
        Choose Image
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
      </label>

      {/* Original file type */}
      {originalType && (
        <p className="mt-3 text-sm text-gray-700">
          Original File Type:{" "}
          <span className="font-semibold">{originalType}</span>
        </p>
      )}

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

      {/* Format selection */}
      <div className="mt-4">
        <label className="text-sm font-medium">Convert to:</label>

        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1"
        >
          <option value="image/png">PNG</option>
          <option value="image/jpeg">JPG / JPEG</option>
          <option value="image/webp">WebP</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-4">

        <button
          onClick={convertImage}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
        >
          Convert
        </button>

        <button
          onClick={downloadImage}
          className="border px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
        >
          Download
        </button>

      </div>

      {/* Success message */}
      {convertedSize !== null && (
        <div className="mt-5 p-4 border rounded bg-gray-50">
          <p className="text-green-700 font-medium">
            Conversion successful ✔
          </p>
          <p className="text-sm text-gray-700">
            Converted file size:{" "}
            <span className="font-semibold">
              {formatSize(convertedSize)}
            </span>
          </p>
        </div>
      )}

      {/* Hidden canvas */}
      <canvas ref={canvasRef} className="hidden" />
      </ToolLayout>
  );
}