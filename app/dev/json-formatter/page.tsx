"use client";

import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);

      setOutput(formatted);
      setError("");
    } catch (err) {
      setOutput("");
      setError("Invalid JSON format. Please check your input.");
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);

      setOutput(minified);
      setError("");
    } catch {
      setOutput("");
      setError("Invalid JSON format. Please check your input.");
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
    <ToolLayout tool="text-json-formatter">

      <h1 className="text-3xl font-bold mb-2">
        JSON Formatter
      </h1>

      <p className="text-gray-600 mb-6">
        Format, validate, and minify your JSON instantly.
      </p>

      {/* INPUT */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your JSON here..."
        className="w-full border rounded-lg px-4 py-3 h-40 font-mono"
      />

      {/* BUTTONS */}
      <div className="flex gap-3 mt-4">

        <button
          onClick={formatJson}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Format
        </button>

        <button
          onClick={minifyJson}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 cursor-pointer"
        >
          Minify
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

          <pre className="p-4 bg-gray-50 border rounded-lg overflow-auto text-sm">
            {output}
          </pre>

        </div>
      )}

    </ToolLayout>
  );
}