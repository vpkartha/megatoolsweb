"use client";
import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";

export default function SortLinesTool() {
  const [input, setInput] = useState("");
  const [removeEmpty, setRemoveEmpty] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const sortAZ = () => {
    let lines = input.split("\n");

    if (removeEmpty) {
      lines = lines.filter((line) => line.trim() !== "");
    }

    const sorted = lines.sort((a, b) => a.localeCompare(b));
    setResult(sorted.join("\n"));
    setCopied(false);
  };

  const sortZA = () => {
    let lines = input.split("\n");

    if (removeEmpty) {
      lines = lines.filter((line) => line.trim() !== "");
    }

    const sorted = lines.sort((a, b) => b.localeCompare(a));
    setResult(sorted.join("\n"));
    setCopied(false);
  };

  const copyResult = async () => {
    if (!result) return;

    await navigator.clipboard.writeText(result);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  const reset = () => {
    setInput("");
    setRemoveEmpty(false);
    setResult("");
    setCopied(false);
  };

  return (
    <ToolLayout tool="sort-lines">

      <h1 className="text-3xl font-bold mb-2">Sort Lines</h1>
      <p className="text-gray-600 mb-6">
        Sort your text lines alphabetically (A→Z or Z→A) with optional empty-line removal.
      </p>

      <div className="space-y-4">

        {/* Input */}
        <textarea
          placeholder="Enter text (one item per line)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 h-40"
        />

        {/* Remove empty lines */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={removeEmpty}
            onChange={(e) => setRemoveEmpty(e.target.checked)}
          />
          <span>Remove empty lines</span>
        </label>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">

          <button
            onClick={sortAZ}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Sort A → Z
          </button>

          <button
            onClick={sortZA}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Sort Z → A
          </button>

          <button
            onClick={copyResult}
            disabled={!result}
            className={`px-4 py-2 rounded-lg text-white 
              ${result ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}`}
          >
            {copied ? "Copied!" : "Copy Result"}
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
          <h2 className="font-semibold mb-2">Sorted Lines:</h2>
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}

    </ToolLayout>
  );
}
