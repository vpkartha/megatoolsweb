"use client";

import { useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import ToolLayout from "@/components/ToolLayout";   

export default function MergePDFPage() {

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  // HANDLE FILE SELECTION
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    if (!e.target.files) return;

    const selectedFiles =
      Array.from(e.target.files);

    // VALIDATE PDF FILES
    const invalidFiles =
      selectedFiles.filter(
        (file) =>
          file.type !== "application/pdf"
      );

    if (invalidFiles.length > 0) {

      setMessage(
        "Only PDF files are allowed."
      );

      setFiles([]);

      return;

    }

    setFiles(selectedFiles);

    setMessage("");

  };

  // OPEN FILE PICKER
  const openFilePicker = () => {

    fileInputRef.current?.click();

  };

  // RESET
  const resetFiles = () => {

    setFiles([]);
    setMessage("");

    if (fileInputRef.current) {

      fileInputRef.current.value = "";

    }

  };

  // MERGE PDFs
  const mergePDFs = async () => {

    if (files.length < 2) {

      setMessage(
        "Please select at least 2 PDF files."
      );

      return;

    }

    try {

      setLoading(true);

      setMessage("");

      // CREATE NEW PDF
      const mergedPdf =
        await PDFDocument.create();

      // LOOP THROUGH FILES
      for (const file of files) {

        const arrayBuffer =
          await file.arrayBuffer();

        const pdf =
          await PDFDocument.load(
            arrayBuffer
          );

        const copiedPages =
          await mergedPdf.copyPages(
            pdf,
            pdf.getPageIndices()
          );

        copiedPages.forEach((page) => {

          mergedPdf.addPage(page);

        });

      }

      // SAVE MERGED PDF
      const mergedPdfBytes =
        await mergedPdf.save();

      // CREATE DOWNLOAD
            const blob = new Blob(
        [new Uint8Array(mergedPdfBytes)],
        {
            type: "application/pdf",
        }
        );

      const url =
        URL.createObjectURL(blob);

      const a =
        document.createElement("a");

      a.href = url;

      a.download = "merged.pdf";

      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);

      URL.revokeObjectURL(url);

      setMessage(
        "PDFs merged successfully."
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Error merging PDFs."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

     <ToolLayout tool="merge-pdf">


      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Merge PDF
        </h1>

        {/* FILE PICKER AREA */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-slate-50 text-center">

          {/* HIDDEN INPUT */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* CHOOSE FILES BUTTON */}
          <button
            onClick={openFilePicker}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold transition"
          >
            Choose PDF Files
          </button>

          <p className="text-sm text-gray-500 mt-3">
            Select multiple PDF files
          </p>

        </div>

        {/* FILE LIST */}
        {files.length > 0 && (

          <div className="mt-6">

            <h2 className="font-semibold mb-3">
              Selected Files
            </h2>

            <div className="space-y-2">

              {files.map((file, index) => (

                <div
                  key={index}
                  className="bg-slate-100 border rounded-lg px-3 py-2 text-sm"
                >

                  {index + 1}. {file.name}

                </div>

              ))}

            </div>

          </div>

        )}

        {/* BUTTONS */}
        <div className="mt-6 flex justify-center gap-4">

          {/* MERGE BUTTON */}
          <button
            onClick={mergePDFs}
            disabled={loading}
            className={`px-6 py-3 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >

            {loading
              ? "Merging PDFs..."
              : "Merge PDFs"}

          </button>

          {/* RESET BUTTON */}
          <button
            onClick={resetFiles}
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