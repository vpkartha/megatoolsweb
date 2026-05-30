"use client";

import ToolLayout from "@/components/ToolLayout";
import { useRef, useState } from "react";

export default function ImageResizer() {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);

  const [preview, setPreview] = useState<string | null>(null);

  // Percentage states
  const [increasePercent, setIncreasePercent] = useState("");
  const [decreasePercent, setDecreasePercent] = useState("");

  // Final dimensions
  const [newWidth, setNewWidth] = useState(0);
  const [newHeight, setNewHeight] = useState(0);

  // Resize message
  const [resizeMessage, setResizeMessage] = useState("");

  // File size
  const [newFileSize, setNewFileSize] = useState("");

  // Warning message
  const [warningMessage, setWarningMessage] = useState("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];

    if (!file) return;

    const img = new Image();

    img.src = URL.createObjectURL(file);

    img.onload = () => {

      setImage(img);

      setPreview(img.src);

      setOriginalWidth(img.width);
      setOriginalHeight(img.height);

      setNewWidth(img.width);
      setNewHeight(img.height);

      setIncreasePercent("");
      setDecreasePercent("");

      setResizeMessage("");
      setNewFileSize("");
      setWarningMessage("");
    };
  };

  // Increase size
  const handleIncrease = (value: string) => {

    // Prevent both fields
    if (decreasePercent !== "" && value !== "") {

      setWarningMessage(
        "You cannot use both Increase % and Decrease % together."
      );

      return;
    }

    setWarningMessage("");

    setIncreasePercent(value);

    if (!image) return;

    const percent = parseFloat(value);

    if (isNaN(percent)) {

      setNewWidth(originalWidth);
      setNewHeight(originalHeight);

      return;
    }

    const factor = 1 + percent / 100;

    setNewWidth(Math.round(originalWidth * factor));
    setNewHeight(Math.round(originalHeight * factor));
  };

  // Decrease size
  const handleDecrease = (value: string) => {

    // Prevent both fields
    if (increasePercent !== "" && value !== "") {

      setWarningMessage(
        "You cannot use both Increase % and Decrease % together."
      );

      return;
    }

    setWarningMessage("");

    setDecreasePercent(value);

    if (!image) return;

    const percent = parseFloat(value);

    if (isNaN(percent)) {

      setNewWidth(originalWidth);
      setNewHeight(originalHeight);

      return;
    }

    const factor = 1 - percent / 100;

    setNewWidth(Math.round(originalWidth * factor));
    setNewHeight(Math.round(originalHeight * factor));
  };

  // Format bytes
  const formatBytes = (bytes: number) => {

    if (bytes < 1024) return bytes + " Bytes";

    else if (bytes < 1024 * 1024)
      return (bytes / 1024).toFixed(2) + " KB";

    else
      return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const resizeImage = () => {

    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = newWidth;
    canvas.height = newHeight;

    ctx.clearRect(0, 0, newWidth, newHeight);

    ctx.drawImage(image, 0, 0, newWidth, newHeight);

    // Get resized image size
    canvas.toBlob((blob) => {

      if (blob) {

        const size = formatBytes(blob.size);

        setNewFileSize(size);

        setResizeMessage(
          `Image resized to ${newWidth} × ${newHeight}`
        );
      }

    }, "image/png");
  };

  const downloadImage = () => {

    if (!canvasRef.current) return;

    const link = document.createElement("a");

    link.download = "resized-image.png";

    link.href = canvasRef.current.toDataURL("image/png");

    link.click();
  };

  return (

    <ToolLayout tool="image-resizer">

      <h1 className="text-3xl font-bold mb-2">
        Image Resizer
      </h1>

      <p className="text-gray-600 mb-6">
        Resize images by percentage without distortion.
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

        <div className="mt-6">

          <img
            src={preview}
            alt="preview"
            className="max-w-full border rounded"
          />

        </div>
      )}

      {/* Original Size */}
      {image && (

        <div className="mt-4 text-sm text-gray-700">

          Original Size:

          {" "}

          <span className="font-semibold">
            {originalWidth} × {originalHeight}
          </span>

        </div>
      )}

      {/* Percentage Inputs */}
      <div className="grid grid-cols-2 gap-4 mt-6">

        {/* Increase */}
        <div>

          <label className="block mb-2 font-medium">
            Increase Size (%)
          </label>

          <div className="flex items-center border rounded overflow-hidden">

            <div className="bg-green-600 text-white px-4 py-2 font-bold">
              +
            </div>

            <input
              type="number"
              placeholder="Enter %"
              value={increasePercent}
              onChange={(e) => handleIncrease(e.target.value)}
              className="w-full px-3 py-2 outline-none"
            />

          </div>

        </div>

        {/* Decrease */}
        <div>

          <label className="block mb-2 font-medium">
            Decrease Size (%)
          </label>

          <div className="flex items-center border rounded overflow-hidden">

            <div className="bg-red-600 text-white px-4 py-2 font-bold">
              -
            </div>

            <input
              type="number"
              placeholder="Enter %"
              value={decreasePercent}
              onChange={(e) => handleDecrease(e.target.value)}
              className="w-full px-3 py-2 outline-none"
            />

          </div>

        </div>

      </div>

      {/* Warning Message */}
      {warningMessage && (

        <div className="mt-4 p-3 rounded bg-red-100 text-red-700 border border-red-300">

          {warningMessage}

        </div>
      )}

      {/* New Dimensions */}
      {image && (

        <div className="mt-6 p-4 border rounded bg-gray-50">

          <div className="text-sm text-gray-600 mb-2">
            New Dimensions
          </div>

          <div className="text-xl font-bold">
            {newWidth} × {newHeight}
          </div>

          {resizeMessage && (

            <div className="mt-3 text-green-600 font-medium">

              {resizeMessage}

              <div className="mt-1 text-blue-600">
                New File Size : {newFileSize}
              </div>

            </div>

          )}

        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 mt-6">

        <button
          onClick={resizeImage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Resize
        </button>

        <button
          onClick={downloadImage}
          className="border px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
        >
          Download
        </button>

      </div>

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} className="hidden" />

    </ToolLayout>
  );
}