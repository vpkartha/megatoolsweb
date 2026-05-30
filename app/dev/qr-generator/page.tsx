"use client";

import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QrGenerator() {
  const [text, setText] = useState("");
  const [value, setValue] = useState("");

  const generate = () => {
    setValue(text);
  };

  const reset = () => {
    setText("");
    setValue("");
  };

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(value);
      alert("Copied to clipboard");
    } catch {
      alert("Copy failed");
    }
  };

  return (
    <ToolLayout tool="text-qr-generator">

      <h1 className="text-3xl font-bold mb-2">
        QR Code Generator
      </h1>

      <p className="text-gray-600 mb-6">
        Generate QR codes for text, URLs, or any data instantly.
      </p>

      {/* INPUT */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text or URL..."
        className="w-full border rounded-lg px-4 py-3 h-28"
      />

      {/* BUTTONS */}
      <div className="flex gap-3 mt-4">

        <button
          onClick={generate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Generate QR
        </button>

        <button
          onClick={reset}
          className="border px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
        >
          Reset
        </button>

      </div>

      {/* QR OUTPUT */}
      {value && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50 flex flex-col items-center gap-4">

          <QRCodeCanvas value={value} size={180} />

          <p className="break-all text-center text-sm">
            {value}
          </p>

          <div className="flex gap-3">

            <button
              onClick={copyText}
              className="text-sm border px-3 py-1 rounded hover:bg-gray-100 cursor-pointer"
            >
              Copy Text
            </button>

          </div>

        </div>
      )}

    </ToolLayout>
  );
}