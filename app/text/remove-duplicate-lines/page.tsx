"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";  

export default function RemoveDuplicateLinesPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  // Remove duplicate lines
  const handleRemoveDuplicates = () => {
    const lines = input.split("\n");

    const uniqueLines = [
      ...new Set(
        lines.filter((line) => line.trim() !== "")
      ),
    ];

    setOutput(uniqueLines.join("\n"));
  };

  // Copy output text
  const handleCopy = async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      alert("Copied to clipboard!");
    } catch (error) {
      alert("Failed to copy text.");
    }
  };

  // Reset both textareas
  const handleReset = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout tool="remove-duplicate-lines">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold">
            Remove Duplicate Lines
          </h1>
         
          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleRemoveDuplicates}
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              Remove
            </button>

            <button
              onClick={handleCopy}
              className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
            >
              Copy
            </button>

            <button
              onClick={handleReset}
              className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Input Box */}
        <div className="mb-6">
          <label className="mb-2 block text-lg font-bold">
            Input Text below and click "Remove" button to remove duplicate lines
          </label>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your text here..."
            className="h-64 w-full rounded-lg border p-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Output Box */}
        <div>
          <label className="mb-2 block text-lg font-bold">
            Result: Click "Copy" button to copy the result
          </label>

          <textarea
            readOnly
            value={output}
            placeholder="Duplicate-free text will appear here..."
            className="h-64 w-full rounded-lg border bg-gray-50 p-4"
          />
        </div>
      </div>
    </ToolLayout>
  );
}