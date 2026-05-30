"use client";
import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";

export default function ReverseTextTool() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const reverseText = () => {
    const reversed = input.split("").reverse().join("");
    setResult(reversed);
    setCopied(false);
  };

  const reset = () => {
    setInput("");
    setResult("");
    setCopied(false);
  };

  const copyResult = async () => {
    if (!result) return;

    await navigator.clipboard.writeText(result);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout tool="reverse-text">

      <h1 className="text-3xl font-bold mb-2">Reverse Text Tool</h1>
      <p className="text-gray-600 mb-6">
        Reverse your text instantly and copy the result with one click.
      </p>

      <div className="space-y-4">

        {/* Input */}
        <textarea
          placeholder="Enter your text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 h-40"
        />

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">

          <button
            onClick={reverseText}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Reverse Text
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
          <h2 className="font-semibold mb-2">Reversed Text:</h2>
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}

    </ToolLayout>
  );
}
