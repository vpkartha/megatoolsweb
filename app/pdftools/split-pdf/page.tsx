"use client";

import { useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import ToolLayout from "@/components/ToolLayout";   

export default function SplitPDFPage() {

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [splitMode, setSplitMode] =
    useState("pages");

  const [startPage, setStartPage] =
    useState("");

  const [endPage, setEndPage] =
    useState("");

  const [startSentence, setStartSentence] =
    useState("");

  const [endSentence, setEndSentence] =
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

    setStartPage("");
    setEndPage("");

    setStartSentence("");
    setEndSentence("");

    setMessage("");

    setSplitMode("pages");

    if (fileInputRef.current) {

      fileInputRef.current.value = "";

    }

  };

  // SPLIT PDF
  const splitPDF = async () => {

    if (!file) {

      setMessage(
        "Please select a PDF file."
      );

      return;

    }

    // SENTENCE MODE
    if (splitMode === "sentence") {

      setMessage(
        "Sentence-based PDF splitting requires advanced OCR/text extraction engine. Use Page Range mode for now."
      );

      return;

    }

    // PAGE MODE
    try {

      setLoading(true);

      const start =
        parseInt(startPage);

      const end =
        parseInt(endPage);

      if (
        isNaN(start) ||
        isNaN(end)
      ) {

        setMessage(
          "Please enter valid page numbers."
        );

        setLoading(false);

        return;

      }

      if (start > end) {

        setMessage(
          "From Page cannot be greater than To Page."
        );

        setLoading(false);

        return;

      }

      const arrayBuffer =
        await file.arrayBuffer();

      const pdf =
        await PDFDocument.load(
          arrayBuffer
        );

      const totalPages =
        pdf.getPageCount();

      if (
        start < 1 ||
        end > totalPages
      ) {

        setMessage(
          `PDF contains only ${totalPages} pages.`
        );

        setLoading(false);

        return;

      }

      // CREATE NEW PDF
      const newPdf =
        await PDFDocument.create();

      // PAGE INDEX ARRAY
      const pageIndices =
        [];

      for (
        let i = start - 1;
        i <= end - 1;
        i++
      ) {

        pageIndices.push(i);

      }

      // COPY PAGES
      const copiedPages =
        await newPdf.copyPages(
          pdf,
          pageIndices
        );

      copiedPages.forEach((page) => {

        newPdf.addPage(page);

      });

      // SAVE PDF
      const pdfBytes =
        await newPdf.save();

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
        `split_pages_${start}_to_${end}.pdf`;

      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);

      URL.revokeObjectURL(url);

      setMessage(
        "PDF split successfully."
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Error splitting PDF."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

     <ToolLayout tool="split-pdf">

      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          Split PDF
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

        {/* SPLIT MODE */}
        <div className="mt-6">

          <label className="font-semibold block mb-4">
            Split Mode
          </label>

          <div className="flex flex-col gap-3">

            {/* PAGE RANGE */}
            <label className="flex items-center gap-3 cursor-pointer">

              <input
                type="radio"
                name="splitMode"
                checked={splitMode === "pages"}
                onChange={() =>
                  setSplitMode("pages")
                }
                className="w-4 h-4"
              />

              <span className="text-sm font-medium">
                Split by Page Range
              </span>

            </label>

            {/* SENTENCE RANGE */}
            <label className="flex items-center gap-3 cursor-pointer">

              <input
                type="radio"
                name="splitMode"
                checked={splitMode === "sentence"}
                onChange={() =>
                  setSplitMode("sentence")
                }
                className="w-4 h-4"
              />

              <span className="text-sm font-medium">
                Split by Sentence Range
              </span>

            </label>

          </div>

        </div>

        {/* PAGE MODE */}
        {splitMode === "pages" && (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

            <div>

              <label className="block mb-2 font-medium">
                From Page
              </label>

              <input
                type="number"
                value={startPage}
                onChange={(e) =>
                  setStartPage(
                    e.target.value
                  )
                }
                className="w-full border rounded-lg p-3"
                placeholder="Enter start page"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                To Page
              </label>

              <input
                type="number"
                value={endPage}
                onChange={(e) =>
                  setEndPage(
                    e.target.value
                  )
                }
                className="w-full border rounded-lg p-3"
                placeholder="Enter end page"
              />

            </div>

          </div>

        )}

        {/* SENTENCE MODE */}
        {splitMode === "sentence" && (

          <div className="grid grid-cols-1 gap-4 mt-6">

            <div>

              <label className="block mb-2 font-medium">
                Start Sentence
              </label>

              <textarea
                value={startSentence}
                onChange={(e) =>
                  setStartSentence(
                    e.target.value
                  )
                }
                className="w-full border rounded-lg p-3"
                placeholder="Enter start sentence"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                End Sentence
              </label>

              <textarea
                value={endSentence}
                onChange={(e) =>
                  setEndSentence(
                    e.target.value
                  )
                }
                className="w-full border rounded-lg p-3"
                placeholder="Enter end sentence"
              />

            </div>

          </div>

        )}

        {/* BUTTONS */}
        <div className="mt-8 flex justify-center gap-4">

          {/* SPLIT BUTTON */}
          <button
            onClick={splitPDF}
            disabled={loading}
            className={`px-6 py-3 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >

            {loading
              ? "Splitting PDF..."
              : "Split PDF"}

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