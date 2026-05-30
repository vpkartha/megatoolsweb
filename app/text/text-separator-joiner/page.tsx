"use client";
import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";

export default function TextSeparatorJoiner() {
  const [input, setInput] = useState("");
  const [separator, setSeparator] = useState("");
  const [joiner, setJoiner] = useState("");
  const [result, setResult] = useState("");

  const handleSplit = () => {
    if (!input.trim()) return;
    const items = input.split(separator).map((i) => i.trim());
    setResult(items.join("\n"));
  };

  const handleJoin = () => {
    if (!input.trim()) return;
    const lines = input.split("\n").map((i) => i.trim());
    setResult(lines.join(joiner));
  };

  const reset = () => {
    setInput("");
    setSeparator("");
    setJoiner("");
    setResult("");
  };

  return (
    <ToolLayout tool="text-separator-joiner">

      <h1 className="text-3xl font-bold mb-2">Text Separator / Joiner</h1>
      <p className="text-gray-600 mb-6">
        Split text using a separator or join lines using a custom joiner.
      </p>

      {/* Inputs */}
      <div className="space-y-4">

        <textarea
          placeholder="Enter your text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 h-40"
        />

        <div>
          <label className="block text-sm font-medium mb-1">Separator (for splitting)</label>
          <input
            type="text"
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Joiner (for joining)</label>
          <input
            type="text"
            value={joiner}
            onChange={(e) => setJoiner(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSplit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Split Text
          </button>

          <button
            onClick={handleJoin}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Join Text
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
