"use client";
import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";

export default function RemoveExtraSpaces() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const removeSpaces = () => {
    if (!input.trim()) return;

    const cleaned = input
      .replace(/\s+/g, " ")        // multiple spaces → single space
      .replace(/^\s+|\s+$/g, "");  // trim start & end

    setResult(cleaned);
  };

  const removeLineBreaks = () => {
    if (!input.trim()) return;

    const cleaned = input
      .replace(/\n+/g, "\n")       // multiple blank lines → single line
      .trim();

    setResult(cleaned);
  };

  const fullClean = () => {
    if (!input.trim()) return;

    const cleaned = input
      .replace(/[ \t]+/g, " ")     // collapse spaces/tabs
      .replace(/\n{2,}/g, "\n")    // collapse multiple blank lines
      .trim();

    setResult(cleaned);
  };

  const reset = () => {
    setInput("");
    setResult("");
  };

  return (
    <ToolLayout tool="remove-extra-spaces">

      <h1 className="text-3xl font-bold mb-2">Remove Extra Spaces</h1>
      <p className="text-gray-600 mb-6">
        Clean your text by removing extra spaces, tabs, and blank lines.
      </p>

      {/* Input */}
      <div className="space-y-4">

        <textarea
          placeholder="Paste your text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 h-40"
        />

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">

          <button
            onClick={removeSpaces}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Remove Extra Spaces
          </button>

          <button
            onClick={removeLineBreaks}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Remove Blank Lines
          </button>

          <button
            onClick={fullClean}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Full Clean
          </button>

          <button
            onClick={reset}
            className="border px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            Reset
          </button>

        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h2 className="font-semibold mb-2">Cleaned Text:</h2>
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}

    </ToolLayout>
  );
}
