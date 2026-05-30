"use client";
import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";

export default function LineCounter() {
  const [input, setInput] = useState("");
  const [totalLines, setTotalLines] = useState<number | null>(null);
  const [nonEmptyLines, setNonEmptyLines] = useState<number | null>(null);
  const [emptyLines, setEmptyLines] = useState<number | null>(null);

  const countLines = () => {
    const lines = input.split("\n");

    const total = lines.length;
    const nonEmpty = lines.filter((line) => line.trim() !== "").length;
    const empty = total - nonEmpty;

    setTotalLines(total);
    setNonEmptyLines(nonEmpty);
    setEmptyLines(empty);
  };

  const reset = () => {
    setInput("");
    setTotalLines(null);
    setNonEmptyLines(null);
    setEmptyLines(null);
  };

  return (
    <ToolLayout tool="line-counter">

      <h1 className="text-3xl font-bold mb-2">Line Counter</h1>
      <p className="text-gray-600 mb-6">
        Count total lines, empty lines, and non‑empty lines in your text.
      </p>

      <div className="space-y-4">

        {/* Text Input */}
        <textarea
          placeholder="Paste your text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 h-40"
        />

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={countLines}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Count Lines
          </button>

          <button
            onClick={reset}
            className="border px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Results */}
      {totalLines !== null && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50 space-y-2">

          <p>
            Total Lines: <span className="font-bold">{totalLines}</span>
          </p>

          <p>
            Non‑Empty Lines: <span className="font-bold">{nonEmptyLines}</span>
          </p>

          <p>
            Empty Lines: <span className="font-bold">{emptyLines}</span>
          </p>

        </div>
      )}

    </ToolLayout>
  );
}
