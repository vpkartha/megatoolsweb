"use client";
import ToolLayout from "@/components/ToolLayout";
import EXIF from "exif-js";
import { useState } from "react";

export default function ImageMetadataViewer() {
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [metadata, setMetadata] = useState<any>({});

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    setFile(f);

    const image = new Image();
    image.src = URL.createObjectURL(f);

    image.onload = () => {
      setImg(image);

      // Basic metadata
      const basicData = {
        fileName: f.name,
        fileSize: (f.size / 1024).toFixed(2) + " KB",
        fileType: f.type || "Unknown",
        lastModified: new Date(f.lastModified).toLocaleString(),
        width: image.width,
        height: image.height,
        aspectRatio: (image.width / image.height).toFixed(2),
      };

      setMetadata(basicData);

      // EXIF metadata (camera info etc.)
      EXIF.getData(f as any, function (this: any) {
        const exifData = EXIF.getAllTags(this);

        setMetadata((prev: any) => ({
          ...prev,
          ...exifData,
        }));
      });
    };
  };

  const reset = () => {
    setFile(null);
    setImg(null);
    setMetadata({});
  };

  return (
       <ToolLayout tool="image-metadata">

      <h1 className="text-3xl font-bold mb-2">Image Metadata Viewer</h1>
      <p className="text-gray-600 mb-6">
        View file details, image properties, and EXIF metadata.
      </p>

      {/* Upload button */}
      <label className="inline-block cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
        Choose Image
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
      </label>

      {/* Reset button */}
      {file && (
        <button
          onClick={reset}
          className="ml-3 border px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
        >
          Reset
        </button>
      )}

      {/* Image preview */}
      {img && (
        <div className="mt-4">
          <img
            src={img.src}
            alt="preview"
            className="max-w-full border rounded"
          />
        </div>
      )}

      {/* Metadata display */}
      {Object.keys(metadata).length > 0 && (
        <div className="mt-6 p-4 border rounded bg-gray-50">

          <h2 className="font-semibold mb-3">Image Details</h2>

          <div className="space-y-2 text-sm">

            {Object.entries(metadata).map(([key, value]) => (
              <p key={key}>
                <span className="font-medium">{key}:</span>{" "}
                {String(value)}
              </p>
            ))}

          </div>

        </div>
      )}
         </ToolLayout>
  );
}