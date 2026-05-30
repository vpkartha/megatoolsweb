"use client";

import { useRef, useState } from "react";
import {
  PDFDocument,
} from "pdf-lib";

import ToolLayout from "@/components/ToolLayout";

export default function CompressPDFPage() {

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [originalSize, setOriginalSize] =
    useState("");

  const [compressedSize, setCompressedSize] =
    useState("");

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  // FORMAT FILE SIZE
  const formatBytes = (
    bytes: number
  ) => {

    if (bytes < 1024)
      return bytes + " Bytes";

    else if (
      bytes < 1024 * 1024
    )
      return (
        (
          bytes / 1024
        ).toFixed(2) + " KB"
      );

    else
      return (
        (
          bytes /
          (1024 * 1024)
        ).toFixed(2) + " MB"
      );

  };

  // OPEN FILE PICKER
  const openFilePicker = () => {

    fileInputRef.current?.click();

  };

  // HANDLE FILE
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    if (!e.target.files?.[0]) return;

    const selectedFile =
      e.target.files[0];

    // VALIDATE PDF
    if (
      selectedFile.type !==
      "application/pdf"
    ) {

      setMessage(
        "Only PDF files are allowed."
      );

      setFile(null);

      return;

    }

    setFile(selectedFile);

    setOriginalSize(
      formatBytes(
        selectedFile.size
      )
    );

    setCompressedSize("");

    setMessage("");

  };

  // RESET
  const resetAll = () => {

    setFile(null);

    setOriginalSize("");

    setCompressedSize("");

    setMessage("");

    if (fileInputRef.current) {

      fileInputRef.current.value = "";

    }

  };

  // COMPRESS PDF
  const compressPDF = async () => {

    if (!file) {

      setMessage(
        "Please select a PDF file."
      );

      return;

    }

    try {

      setLoading(true);

      setMessage("");

      // LOAD FILE
      const arrayBuffer =
        await file.arrayBuffer();

      // LOAD PDF
      const pdfDoc =
        await PDFDocument.load(
          arrayBuffer
        );

      // SAVE WITH COMPRESSION
      const compressedPdfBytes =
        await pdfDoc.save({
          useObjectStreams: true,
        });

      // CREATE BLOB
      const blob = new Blob(
        [
          new Uint8Array(
            compressedPdfBytes
          ),
        ],
        {
          type:
            "application/pdf",
        }
      );

      // COMPRESSED SIZE
      setCompressedSize(
        formatBytes(blob.size)
      );

      // DOWNLOAD
      const url =
        URL.createObjectURL(
          blob
        );

      const a =
        document.createElement("a");

      a.href = url;

      a.download =
        "compressed.pdf";

      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);

      URL.revokeObjectURL(url);

      setMessage(
        "PDF compressed successfully."
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Error compressing PDF."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <ToolLayout tool="compress-pdf">

      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-red-700 mb-6">
          Compress PDF
        </h1>

        {/* FILE PICKER */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-slate-50 text-center">

          {/* HIDDEN INPUT */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={
              handleFileChange
            }
            className="hidden"
          />

          {/* BUTTON */}
          <button
            onClick={
              openFilePicker
            }
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold transition"
          >
            Choose PDF File
          </button>

          <p className="text-sm text-gray-500 mt-3">
            Select one PDF file
          </p>

        </div>

        {/* FILE NAME */}
        {file && (

          <div className="mt-5 bg-slate-100 border rounded-lg px-3 py-2 text-sm">

            <div>
              <strong>
                Selected File:
              </strong>{" "}
              {file.name}
            </div>

            <div className="mt-1">
              <strong>
                Original Size:
              </strong>{" "}
              {originalSize}
            </div>

            {compressedSize && (

              <div className="mt-1 text-green-700 font-semibold">

                <strong>
                  Compressed Size:
                </strong>{" "}
                {compressedSize}

              </div>

            )}

          </div>

        )}

        {/* BUTTONS */}
        <div className="mt-8 flex justify-center gap-4">

          {/* COMPRESS BUTTON */}
          <button
            onClick={
              compressPDF
            }
            disabled={loading}
            className={`px-6 py-3 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >

            {loading
              ? "Compressing PDF..."
              : "Compress PDF"}

          </button>

          {/* RESET BUTTON */}
          <button
            onClick={resetAll}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-gray-600 hover:bg-gray-700 text-white font-semibold transition"
          >
            Reset
          </button>

        </div>

        {/* MESSAGE */}
        {message && (

          <div className="mt-5 text-center text-sm font-medium text-gray-700">

            {message}

          </div>

        )}

      </div>

    </ToolLayout>

  );

}