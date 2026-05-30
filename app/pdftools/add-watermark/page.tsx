"use client";

import { useRef, useState } from "react";
import {
  PDFDocument,
  rgb,
  degrees,
  StandardFonts,
} from "pdf-lib";

import ToolLayout from "@/components/ToolLayout";

export default function AddWatermarkPage() {

  const [file, setFile] =
    useState<File | null>(null);

  const [watermarkText, setWatermarkText] =
    useState("CONFIDENTIAL");

  const [fontSize, setFontSize] =
    useState("40");

  const [opacity, setOpacity] =
    useState("0.3");

  const [rotation, setRotation] =
    useState("45");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const fileInputRef =
    useRef<HTMLInputElement>(null);

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

    setMessage("");

  };

  // RESET
  const resetAll = () => {

    setFile(null);

    setWatermarkText(
      "CONFIDENTIAL"
    );

    setFontSize("40");

    setOpacity("0.3");

    setRotation("45");

    setMessage("");

    if (fileInputRef.current) {

      fileInputRef.current.value = "";

    }

  };

  // ADD WATERMARK
  const addWatermark = async () => {

    if (!file) {

      setMessage(
        "Please select a PDF file."
      );

      return;

    }

    if (!watermarkText.trim()) {

      setMessage(
        "Please enter watermark text."
      );

      return;

    }

    try {

      setLoading(true);

      setMessage("");

      const arrayBuffer =
        await file.arrayBuffer();

      const pdfDoc =
        await PDFDocument.load(
          arrayBuffer
        );

      const font =
        await pdfDoc.embedFont(
          StandardFonts.HelveticaBold
        );

      const pages =
        pdfDoc.getPages();

      pages.forEach((page) => {

        const { width, height } =
          page.getSize();

        const textWidth =
          font.widthOfTextAtSize(
            watermarkText,
            Number(fontSize)
          );

        page.drawText(
          watermarkText,
          {

            x:
              width / 2 -
              textWidth / 2,

            y:
              height / 2,

            size:
              Number(fontSize),

            font,

            color: rgb(
              0.75,
              0.75,
              0.75
            ),

            opacity:
              Number(opacity),

            rotate: degrees(
              Number(rotation)
            ),

          }
        );

      });

      // SAVE PDF
      const pdfBytes =
        await pdfDoc.save();

      // DOWNLOAD
      const blob = new Blob(
        [new Uint8Array(pdfBytes)],
        {
          type:
            "application/pdf",
        }
      );

      const url =
        URL.createObjectURL(
          blob
        );

      const a =
        document.createElement("a");

      a.href = url;

      a.download =
        "watermarked.pdf";

      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);

      URL.revokeObjectURL(url);

      setMessage(
        "Watermark added successfully."
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Error adding watermark."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <ToolLayout tool="add-watermark">

      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Add Watermark
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

            Selected File:
            {" "}
            {file.name}

          </div>

        )}

        {/* WATERMARK TEXT */}
        <div className="mt-6">

          <label className="block mb-2 font-medium">
            Watermark Text
          </label>

          <input
            type="text"
            value={
              watermarkText
            }
            onChange={(e) =>
              setWatermarkText(
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
            placeholder="Enter watermark text"
          />

        </div>

        {/* FONT SIZE */}
        <div className="mt-6">

          <label className="block mb-2 font-medium">
            Font Size
          </label>

          <input
            type="number"
            value={fontSize}
            onChange={(e) =>
              setFontSize(
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* OPACITY */}
        <div className="mt-6">

          <label className="block mb-2 font-medium">
            Opacity
          </label>

          <input
            type="number"
            step="0.1"
            min="0"
            max="1"
            value={opacity}
            onChange={(e) =>
              setOpacity(
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* ROTATION */}
        <div className="mt-6">

          <label className="block mb-2 font-medium">
            Rotation Degree
          </label>

          <input
            type="number"
            value={rotation}
            onChange={(e) =>
              setRotation(
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* BUTTONS */}
        <div className="mt-8 flex justify-center gap-4">

          {/* ADD BUTTON */}
          <button
            onClick={
              addWatermark
            }
            disabled={loading}
            className={`px-6 py-3 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >

            {loading
              ? "Processing..."
              : "Add Watermark"}

          </button>

          {/* RESET BUTTON */}
          <button
            onClick={
              resetAll
            }
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition"
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