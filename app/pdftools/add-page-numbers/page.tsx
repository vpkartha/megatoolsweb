"use client";

import { useRef, useState } from "react";
import ToolLayout from "@/components/ToolLayout";   
import {
  PDFDocument,
  rgb,
  StandardFonts,
} from "pdf-lib";

export default function AddPageNumbersPage() {

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [position, setPosition] =
    useState("bottom-center");

  const [fontSize, setFontSize] =
    useState("12");

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

    setPosition("bottom-center");

    setFontSize("12");

    setMessage("");

    if (fileInputRef.current) {

      fileInputRef.current.value = "";

    }

  };

  // ADD PAGE NUMBERS
  const addPageNumbers = async () => {

    if (!file) {

      setMessage(
        "Please select a PDF file."
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
          StandardFonts.Helvetica
        );

      const pages =
        pdfDoc.getPages();

      const totalPages =
        pages.length;

      pages.forEach((page, index) => {

        const { width, height } =
          page.getSize();

        const pageNumber =
          `${index + 1}`;

        const textWidth =
          font.widthOfTextAtSize(
            pageNumber,
            Number(fontSize)
          );

        let x = 0;
        let y = 0;

        // POSITIONING
        switch (position) {

          case "top-left":
            x = 30;
            y = height - 30;
            break;

          case "top-center":
            x = width / 2 - textWidth / 2;
            y = height - 30;
            break;

          case "top-right":
            x = width - 50;
            y = height - 30;
            break;

          case "bottom-left":
            x = 30;
            y = 20;
            break;

          case "bottom-center":
            x = width / 2 - textWidth / 2;
            y = 20;
            break;

          case "bottom-right":
            x = width - 50;
            y = 20;
            break;

        }

        // DRAW NUMBER
        page.drawText(pageNumber, {

          x,
          y,

          size: Number(fontSize),

          font,

          color: rgb(0, 0, 0),

        });

      });

      // SAVE PDF
      const pdfBytes =
        await pdfDoc.save();

      // DOWNLOAD
        const blob = new Blob(
        [new Uint8Array(pdfBytes)],
        {
            type: "application/pdf",
        }
        );

      const url =
        URL.createObjectURL(blob);

      const a =
        document.createElement("a");

      a.href = url;

      a.download =
        "page-numbered.pdf";

      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);

      URL.revokeObjectURL(url);

      setMessage(
        "Page numbers added successfully."
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Error adding page numbers."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

     <ToolLayout tool="add-page-numbers">

      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Add Page Numbers
        </h1>

        {/* FILE PICKER */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-slate-50 text-center">

          {/* HIDDEN INPUT */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* BUTTON */}
          <button
            onClick={openFilePicker}
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

            Selected File: {file.name}

          </div>

        )}

        {/* POSITION */}
        <div className="mt-6">

          <label className="block mb-2 font-medium">
            Page Number Position
          </label>

          <select
            value={position}
            onChange={(e) =>
              setPosition(
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          >

            <option value="top-left">
              Top Left
            </option>

            <option value="top-center">
              Top Center
            </option>

            <option value="top-right">
              Top Right
            </option>

            <option value="bottom-left">
              Bottom Left
            </option>

            <option value="bottom-center">
              Bottom Center
            </option>

            <option value="bottom-right">
              Bottom Right
            </option>

          </select>

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
            placeholder="Enter font size"
          />

        </div>

        {/* BUTTONS */}
        <div className="mt-8 flex justify-center gap-4">

          {/* ADD BUTTON */}
          <button
            onClick={addPageNumbers}
            disabled={loading}
            className={`px-6 py-3 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >

            {loading
              ? "Processing..."
              : "Add Page Numbers"}

          </button>

          {/* RESET BUTTON */}
          <button
            onClick={resetAll}
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