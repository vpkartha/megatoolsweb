"use client";

import ToolLayout from "@/components/ToolLayout";   
import { useRef, useState } from "react";

export default function ImageCropper() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [end, setEnd] = useState<{ x: number; y: number } | null>(null);

  const [cropped, setCropped] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      setImage(img);
      setPreview(img.src);
      setCropped(null);
      setStart(null);
      setEnd(null);
    };
  };

  const getRelativePos = (e: React.MouseEvent) => {
    if (!imageRef.current) return { x: 0, y: 0 };

    const rect = imageRef.current.getBoundingClientRect();

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!imageRef.current) return;

    setIsDragging(true);
    setStart(getRelativePos(e));
    setEnd(getRelativePos(e));
    setCropped(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    setEnd(getRelativePos(e));
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    if (
      !start ||
      !end ||
      !image ||
      !canvasRef.current ||
      !imageRef.current
    ) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Displayed image size
    const displayedWidth = imageRef.current.clientWidth;
    const displayedHeight = imageRef.current.clientHeight;

    // Original image size
    const naturalWidth = image.naturalWidth;
    const naturalHeight = image.naturalHeight;

    // Scale factors
    const scaleX = naturalWidth / displayedWidth;
    const scaleY = naturalHeight / displayedHeight;

    // Selection coordinates on displayed image
    const selectionX = Math.min(start.x, end.x);
    const selectionY = Math.min(start.y, end.y);
    const selectionWidth = Math.abs(end.x - start.x);
    const selectionHeight = Math.abs(end.y - start.y);

    // Convert displayed coordinates -> original image coordinates
    const realX = selectionX * scaleX;
    const realY = selectionY * scaleY;
    const realWidth = selectionWidth * scaleX;
    const realHeight = selectionHeight * scaleY;

    canvas.width = realWidth;
    canvas.height = realHeight;

    ctx.drawImage(
      image,
      realX,
      realY,
      realWidth,
      realHeight,
      0,
      0,
      realWidth,
      realHeight
    );

    const croppedDataUrl = canvas.toDataURL("image/png");

    setCropped(croppedDataUrl);
  };

  const downloadImage = () => {
    if (!cropped) return;

    const link = document.createElement("a");
    link.download = "cropped-image.png";
    link.href = cropped;
    link.click();
  };

  const reset = () => {
    setStart(null);
    setEnd(null);
    setCropped(null);
    setIsDragging(false);
  };

  return (
    <ToolLayout tool="image-cropper">
      <h1 className="text-3xl font-bold mb-2">Image Cropper</h1>

      <p className="text-gray-600 mb-6">
        Upload an image and drag to select crop area.
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

      {/* Image */}
      {preview && (
        <div className="mt-6 overflow-auto">
          <div
            ref={containerRef}
            className="relative inline-block border border-gray-300 select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              ref={imageRef}
              src={preview}
              alt="source"
              className="max-w-full block"
              draggable={false}
            />

            {/* Selection Box */}
            {start && end && (
              <div
                className="absolute border-2 border-blue-500 bg-blue-400/30 pointer-events-none"
                style={{
                  left: Math.min(start.x, end.x),
                  top: Math.min(start.y, end.y),
                  width: Math.abs(end.x - start.x),
                  height: Math.abs(end.y - start.y),
                }}
              />
            )}
          </div>

          <p className="mt-3 text-sm text-gray-600">
            👉 Use the mouse to select area to be cropped
          </p>
        </div>
      )}

      {/* Cropped Result */}
      {cropped && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Cropped Image</h2>

          <img
            src={cropped}
            alt="cropped"
            className="border border-gray-300 max-w-full"
          />

          <div className="flex gap-3 mt-4">
            <button
              onClick={downloadImage}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
            >
              Download
            </button>

            <button
              onClick={reset}
              className="border px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} className="hidden" />
    </ToolLayout>
     
  );
}