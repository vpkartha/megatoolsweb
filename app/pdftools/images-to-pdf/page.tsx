"use client";

import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";
import { jsPDF } from "jspdf";
import {
  Upload,
  Image as ImageIcon,
  Download,
  Trash2,
} from "lucide-react";

interface ImageFile {
  file: File;
  preview: string;
}

export default function ImagesToPDF() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [creating, setCreating] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [pdfName, setPdfName] = useState("Images_To_PDF.pdf");

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const validImages = files.filter((file) =>
      file.type.startsWith("image/")
    );

    if (validImages.length === 0) {
      alert("Please select valid image files.");
      return;
    }

    const mappedImages = validImages.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...mappedImages]);

    setDownloadUrl("");
  };

  const removeImage = (index: number) => {
    const updated = [...images];

    URL.revokeObjectURL(updated[index].preview);

    updated.splice(index, 1);

    setImages(updated);
  };

  const moveImageUp = (index: number) => {
    if (index === 0) return;

    const updated = [...images];

    [updated[index - 1], updated[index]] = [
      updated[index],
      updated[index - 1],
    ];

    setImages(updated);
  };

  const moveImageDown = (index: number) => {
    if (index === images.length - 1) return;

    const updated = [...images];

    [updated[index + 1], updated[index]] = [
      updated[index],
      updated[index + 1],
    ];

    setImages(updated);
  };

  const createPDF = async () => {
    if (images.length === 0) {
      alert("Please upload images.");
      return;
    }

    try {
      setCreating(true);

      const pdf = new jsPDF();

      for (let i = 0; i < images.length; i++) {
        const image = images[i];

        const img = new Image();

        img.src = image.preview;

        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const ratio = Math.min(
          pageWidth / img.width,
          pageHeight / img.height
        );

        const imgWidth = img.width * ratio;
        const imgHeight = img.height * ratio;

        const x = (pageWidth - imgWidth) / 2;
        const y = (pageHeight - imgHeight) / 2;

        if (i > 0) {
          pdf.addPage();
        }

        pdf.addImage(
          img,
          "JPEG",
          x,
          y,
          imgWidth,
          imgHeight
        );
      }

      const blob = pdf.output("blob");

      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);

      setCreating(false);
    } catch (error) {
      console.error(error);
      alert("Error creating PDF.");
      setCreating(false);
    }
  };

  const reset = () => {
    images.forEach((img) => {
      URL.revokeObjectURL(img.preview);
    });

    setImages([]);
    setDownloadUrl("");
  };

  return (
    <ToolLayout tool="images-to-pdf">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            Images to PDF
          </h1>

          <p className="text-gray-600">
            Convert multiple images into a single PDF instantly.
          </p>
        </div>

        {/* Upload Area */}
        <div className="border border-gray-200 rounded-2xl p-8 bg-white shadow-sm mb-6">

          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-10 bg-gray-50 hover:bg-gray-100 transition">

            <Upload className="w-14 h-14 text-blue-600 mb-4" />

            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Upload Images
            </h2>

            <p className="text-sm text-gray-500 mb-5 text-center">
              Select JPG, PNG or WEBP images.
            </p>

            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition font-medium">
              Choose Images

              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFiles}
              />
            </label>
          </div>
        </div>

        {/* Images Preview */}
        {images.length > 0 && (
          <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm mb-6">

            <div className="flex items-center gap-2 mb-6">
              <ImageIcon className="text-blue-600" />

              <h2 className="text-2xl font-semibold text-gray-800">
                Uploaded Images
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {images.map((img, index) => (
                <div
                  key={index}
                  className="border rounded-2xl overflow-hidden bg-gray-50"
                >

                  <img
                    src={img.preview}
                    alt={`Preview ${index}`}
                    className="w-full h-64 object-cover"
                  />

                  <div className="p-4">

                    <p className="text-sm font-medium text-gray-700 truncate mb-3">
                      {img.file.name}
                    </p>

                    <div className="flex gap-2 flex-wrap">

                      <button
                        onClick={() => moveImageUp(index)}
                        className="border px-3 py-1 rounded-lg text-sm hover:bg-gray-100"
                      >
                        ↑ Up
                      </button>

                      <button
                        onClick={() => moveImageDown(index)}
                        className="border px-3 py-1 rounded-lg text-sm hover:bg-gray-100"
                      >
                        ↓ Down
                      </button>

                      <button
                        onClick={() => removeImage(index)}
                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8 flex-wrap">

              <button
                onClick={createPDF}
                disabled={creating}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl transition disabled:opacity-50"
              >
                {creating ? "Creating PDF..." : "Create PDF"}
              </button>

              <button
                onClick={reset}
                className="border border-gray-300 hover:bg-gray-100 px-5 py-2.5 rounded-xl transition"
              >
                Reset
              </button>

            </div>

          </div>
        )}

        {/* Download */}
        {downloadUrl && (
          <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">

            <div className="flex items-center gap-2 mb-4">
              <Download className="text-blue-600" />

              <h2 className="text-2xl font-semibold text-gray-800">
                PDF Ready
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border rounded-xl p-4 bg-gray-50">

              <div>
                <p className="font-medium text-gray-800">
                  {pdfName}
                </p>

                <p className="text-sm text-gray-500">
                  Your PDF has been created successfully.
                </p>
              </div>

              <a
                href={downloadUrl}
                download={pdfName}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition"
              >
                <Download size={18} />
                Download PDF
              </a>

            </div>

          </div>
        )}

      </div>
    </ToolLayout>
  );
}