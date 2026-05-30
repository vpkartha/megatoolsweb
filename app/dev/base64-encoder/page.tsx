
"use client";

import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";

export default function Base64Encoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  // Encode text → Base64
  const encodeBase64 = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
      setError("");
    } catch {
      setError("Encoding failed. Please check input.");
      setOutput("");
    }
  };

  // Decode Base64 → text
  const decodeBase64 = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
      setError("");
    } catch {
      setError("Invalid Base64 string.");
      setOutput("");
    }
  };

  const reset = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(output);
      alert("Copied to clipboard");
    } catch {
      alert("Copy failed");
    }
  };

  return (
    <ToolLayout tool="text-base64-encoder">

      <h1 className="text-3xl font-bold mb-2">
        Base64 Encoder / Decoder
      </h1>

      <p className="text-gray-600 mb-6">
        Encode text to Base64 or decode Base64 back to text.
      </p>

      {/* INPUT */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text or Base64 string..."
        className="w-full border rounded-lg px-4 py-3 h-40 font-mono"
      />

      {/* BUTTONS */}
      <div className="flex gap-3 mt-4">

        <button
          onClick={encodeBase64}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Encode
        </button>

        <button
          onClick={decodeBase64}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
        >
          Decode
        </button>

        <button
          onClick={reset}
          className="border px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
        >
          Reset
        </button>

      </div>

      {/* ERROR */}
      {error && (
        <div className="mt-4 p-3 border border-red-300 bg-red-50 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* OUTPUT */}
      {output && (
        <div className="mt-6">

          <div className="flex justify-between items-center mb-2">

            <h2 className="font-semibold">
              Output
            </h2>

            <button
              onClick={copyOutput}
              className="text-sm border px-3 py-1 rounded hover:bg-gray-100 cursor-pointer"
            >
              Copy
            </button>

          </div>

          <pre className="p-4 bg-gray-50 border rounded-lg overflow-auto text-sm break-words">
            {output}
          </pre>

        </div>
      )}

    </ToolLayout>
  );
}