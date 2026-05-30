"use client";

import { useRef, useState } from "react";

import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";

import ToolLayout from "@/components/ToolLayout";

export default function CreatePDFPage() {

  const [textContent, setTextContent] =
    useState("");

  const [imageFiles, setImageFiles] =
    useState<File[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const imageInputRef =
    useRef<HTMLInputElement>(null);

  // OPEN IMAGE PICKER
  const openImagePicker = () => {

    imageInputRef.current?.click();

  };

  // HANDLE IMAGE FILES
  const handleImages = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    if (!e.target.files) return;

    const files =
      Array.from(e.target.files);

    const invalidFiles =
      files.filter(
        (file) =>
          !file.type.startsWith(
            "image/"
          )
      );

    if (invalidFiles.length > 0) {

      setMessage(
        "Only image files are allowed."
      );

      setImageFiles([]);

      return;

    }

    setImageFiles(files);

    setMessage("");

  };

  // RESET
  const resetAll = () => {

    setTextContent("");

    setImageFiles([]);

    setMessage("");

    if (imageInputRef.current) {

      imageInputRef.current.value = "";

    }

  };

  // CREATE PDF
  const createPDF = async () => {

    try {

      setLoading(true);

      setMessage("");

      // CREATE PDF
      const pdfDoc =
        await PDFDocument.create();

      // ADD TEXT PAGE
      if (
        textContent.trim()
      ) {

        const page =
          pdfDoc.addPage([
            595,
            842,
          ]);

        const font =
          await pdfDoc.embedFont(
            StandardFonts.Helvetica
          );

        const fontSize =
          12;

        const margin =
          50;

        const cleanedText =
            textContent.replace(
                /[^\x00-\x7F]/g,
                ""
            );


        const lines =
          textContent.split("\n");

        let y =
          page.getHeight() -
          margin;

        lines.forEach(
          (line) => {

            page.drawText(
              line,
              {
                x: margin,
                y,
                size:
                  fontSize,
                font,
                color: rgb(
                  0,
                  0,
                  0
                ),
              }
            );

            y -= 18;

          }
        );

      }

      // ADD IMAGE PAGES
      for (const file of imageFiles) {

        const imageBytes =
          await file.arrayBuffer();

        let embeddedImage;

        // JPG
        if (
          file.type ===
          "image/jpeg"
        ) {

          embeddedImage =
            await pdfDoc.embedJpg(
              imageBytes
            );

        }

        // PNG
        else if (
          file.type ===
          "image/png"
        ) {

          embeddedImage =
            await pdfDoc.embedPng(
              imageBytes
            );

        }

        // OTHER IMAGES
        else {

          continue;

        }

        const imageDims =
          embeddedImage.scale(
            1
          );

        const page =
          pdfDoc.addPage([
            imageDims.width +
              40,
            imageDims.height +
              40,
          ]);

        page.drawImage(
          embeddedImage,
          {
            x: 20,
            y: 20,
            width:
              imageDims.width,
            height:
              imageDims.height,
          }
        );

      }

      // VALIDATION
      if (
        !textContent.trim() &&
        imageFiles.length === 0
      ) {

        setMessage(
          "Please enter text or select images."
        );

        setLoading(false);

        return;

      }

      // SAVE PDF
      const pdfBytes =
        await pdfDoc.save();

      // CREATE BLOB
      const blob = new Blob(
        [
          new Uint8Array(
            pdfBytes
          ),
        ],
        {
          type:
            "application/pdf",
        }
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
        "created.pdf";

      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);

      URL.revokeObjectURL(url);

      setMessage(
        "PDF created successfully."
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Error creating PDF."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <ToolLayout tool="create-pdf">

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Create PDF
        </h1>

        {/* TEXT AREA */}
        <div>

          <label className="block mb-2 font-semibold">
            Enter Text
          </label>

          <textarea
            value={textContent}
            onChange={(e) =>
              setTextContent(
                e.target.value
              )
            }
            rows={10}
            className="w-full border rounded-xl p-4"
            placeholder="Type or paste text here..."
          />

        </div>

        {/* IMAGE PICKER */}
        <div className="mt-8 border-2 border-dashed border-gray-300 rounded-xl p-6 bg-slate-50 text-center">

          {/* HIDDEN INPUT */}
          <input
            ref={imageInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={
              handleImages
            }
            className="hidden"
          />

          {/* BUTTON */}
          <button
            onClick={
              openImagePicker
            }
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold transition"
          >
            Choose Images
          </button>

          <p className="text-sm text-gray-500 mt-3">
            Select JPG or PNG images
          </p>

        </div>

        {/* IMAGE LIST */}
        {imageFiles.length > 0 && (

          <div className="mt-6">

            <h2 className="font-semibold mb-3">
              Selected Images
            </h2>

            <div className="space-y-2">

              {imageFiles.map(
                (
                  file,
                  index
                ) => (

                  <div
                    key={index}
                    className="bg-slate-100 border rounded-lg px-3 py-2 text-sm"
                  >

                    {index + 1}.{" "}
                    {file.name}

                  </div>

                )
              )}

            </div>

          </div>

        )}

        {/* BUTTONS */}
        <div className="mt-8 flex justify-center gap-4">

          {/* CREATE BUTTON */}
          <button
            onClick={
              createPDF
            }
            disabled={loading}
            className={`px-6 py-3 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >

            {loading
              ? "Creating PDF..."
              : "Create PDF"}

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