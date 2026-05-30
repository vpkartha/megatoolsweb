"use client";

import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, FileText, Download, Scissors } from "lucide-react";

export default function ExtractPDFPages() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState("");
  const [extracting, setExtracting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [outputFileName, setOutputFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setDownloadUrl("");
      setOutputFileName("");
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const parsePageRange = (range: string): number[] => {
    const pages: number[] = [];

    range.split(",").forEach((part) => {
      if (part.includes("-")) {
        const [start, end] = part.split("-").map(Number);

        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
      } else {
        pages.push(Number(part));
      }
    });

    return [...new Set(pages)];
  };

  const extractPages = async () => {
    if (!selectedFile || !pageRange.trim()) {
      alert("Please select PDF and enter page range.");
      return;
    }

    try {
      setExtracting(true);

      const bytes = await selectedFile.arrayBuffer();

      const pdfDoc = await PDFDocument.load(bytes);

      const totalPages = pdfDoc.getPageCount();

      const requestedPages = parsePageRange(pageRange);

      const invalidPages = requestedPages.filter(
        (p) => p < 1 || p > totalPages
      );

      if (invalidPages.length > 0) {
        alert(`Invalid pages: ${invalidPages.join(", ")}`);
        setExtracting(false);
        return;
      }

      const newPdf = await PDFDocument.create();

      const copiedPages = await newPdf.copyPages(
        pdfDoc,
        requestedPages.map((p) => p - 1)
      );

      copiedPages.forEach((page) => {
        newPdf.addPage(page);
      });

      const pdfBytes = await newPdf.save();

      const blob = new Blob([new Uint8Array(pdfBytes)], {
        type: "application/pdf",
        });

      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);

      const originalName = selectedFile.name.replace(".pdf", "");

      setOutputFileName(`${originalName}_Extracted.pdf`);

      setExtracting(false);
    } catch (error) {
      console.error(error);
      alert("Error extracting PDF pages.");
      setExtracting(false);
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setPageRange("");
    setDownloadUrl("");
    setOutputFileName("");
  };

  return (
    <ToolLayout tool="extract-pdf-pages">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            Extract PDF Pages
          </h1>

          <p className="text-gray-600">
            Extract selected pages from your PDF and create a new PDF instantly.
          </p>
        </div>

        {/* Upload Section */}
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
            <div className="mt-6 border rounded-xl p-4 bg-gray-50">

              <div className="flex items-center gap-3 mb-5">
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

              {/* Page Range */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Page Range
                </label>

                <input
                  type="text"
                  placeholder="Example: 1,3,5-8"
                  value={pageRange}
                  onChange={(e) => setPageRange(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <p className="text-xs text-gray-500 mt-2">
                  Supports single pages and ranges like 1,3,5-8
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 flex-wrap">

                <button
                  onClick={extractPages}
                  disabled={extracting}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl transition disabled:opacity-50"
                >
                  <Scissors size={18} />

                  {extracting ? "Extracting..." : "Extract Pages"}
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
        </div>

        {/* Download Result */}
        {downloadUrl && (
          <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">

            <div className="flex items-center gap-2 mb-4">
              <Download className="text-blue-600" />

              <h2 className="text-2xl font-semibold text-gray-800">
                Extraction Complete
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border rounded-xl p-4 bg-gray-50">

              <div>
                <p className="font-medium text-gray-800">
                  {outputFileName}
                </p>

                <p className="text-sm text-gray-500">
                  Your extracted PDF is ready.
                </p>
              </div>

              <a
                href={downloadUrl}
                download={outputFileName}
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