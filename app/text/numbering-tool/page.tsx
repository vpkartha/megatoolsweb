"use client";
import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";

export default function NumberingTool() {
  const [input, setInput] = useState("");
  const [start, setStart] = useState("1");
  const [prefix, setPrefix] = useState(". ");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const addNumbers = () => {
    const lines = input.split("\n");
    const startNum = parseInt(start) || 1;

    const numbered = lines.map((line, index) => {
      const num = startNum + index;
      return `${num}${prefix}${line}`;
    });

    setResult(numbered.join("\n"));
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
    setStart("1");
    setPrefix(". ");
    setResult("");
    setCopied(false);
  };

  return (
    <ToolLayout tool="numbering-tool">

      <h1 className="text-3xl font-bold mb-2">Numbering Tool</h1>
      <p className="text-gray-600 mb-6">
        Add line numbers to your text with custom starting number and prefix.
      </p>

      <div className="space-y-4">

        {/* Text Input */}
        <textarea
          placeholder="Enter your text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 h-40"
        />

        {/* Starting Number */}
        <input
          type="number"
          placeholder="Starting number"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />

        {/* Prefix */}
        <input
          type="text"
          placeholder="Prefix (e.g., '. ', ') ', ' - ')"
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">

          <button
            onClick={addNumbers}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Numbers
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
          <h2 className="font-semibold mb-2">Numbered Text:</h2>
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}

    </ToolLayout>
  );
}
