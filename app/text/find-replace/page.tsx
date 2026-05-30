"use client";
import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";

export default function FindReplace() {
  const [input, setInput] = useState("");
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [result, setResult] = useState("");

  const handleReplaceAll = () => {
    if (!findText) return;

    const flags = caseSensitive ? "g" : "gi";
    const regex = new RegExp(findText, flags);

    const output = input.replace(regex, replaceText);
    setResult(output);
  };

  const handleReplaceFirst = () => {
    if (!findText) return;

    const flags = caseSensitive ? "" : "i";
    const regex = new RegExp(findText, flags);

    const output = input.replace(regex, replaceText);
    setResult(output);
  };

  const reset = () => {
    setInput("");
    setFindText("");
    setReplaceText("");
    setCaseSensitive(false);
    setResult("");
  };

  return (
    <ToolLayout tool="find-replace">

      <h1 className="text-3xl font-bold mb-2">Find & Replace Tool</h1>
      <p className="text-gray-600 mb-6">
        Search and replace text with optional case sensitivity.
      </p>

      <div className="space-y-4">

        {/* Main Text Input */}
        <textarea
          placeholder="Enter your text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 h-40"
        />

        {/* Find Text */}
        <input
          type="text"
          placeholder="Find text..."
          value={findText}
          onChange={(e) => setFindText(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />

        {/* Replace Text */}
        <input
          type="text"
          placeholder="Replace with..."
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />

        {/* Case Sensitive Toggle */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
          />
          <span>Case Sensitive</span>
        </label>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">

          <button
            onClick={handleReplaceAll}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Replace All
          </button>

          <button
            onClick={handleReplaceFirst}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Replace First
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
          <h2 className="font-semibold mb-2">Result:</h2>
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}

    </ToolLayout>
  );
}
