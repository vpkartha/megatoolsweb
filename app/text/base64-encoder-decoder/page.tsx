"use client";
import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const encodeBase64 = () => {
    try {
      const encoded = btoa(input);
      setResult(encoded);
      setCopied(false);
    } catch {
      setResult("Invalid input for Base64 encoding");
    }
  };

  const decodeBase64 = () => {
    try {
      const decoded = atob(input);
      setResult(decoded);
      setCopied(false);
    } catch {
      setResult("Invalid Base64 format");
    }
  };

  const copyResult = async () => {
    if (!result) return;

    await navigator.clipboard.writeText(result);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  const reset = () => {
    setInput("");
    setResult("");
    setCopied(false);
  };

  return (
    <ToolLayout tool="base64-encoder-decoder">

      <h1 className="text-3xl font-bold mb-2">Base64 Encoder / Decoder</h1>
      <p className="text-gray-600 mb-6">
        Encode text to Base64 or decode Base64 back to text.
      </p>

      <div className="space-y-4">

        {/* Input */}
        <textarea
          placeholder="Enter text or Base64 string..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 h-40"
        />

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">

          <button
            onClick={encodeBase64}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Encode Base64
          </button>

          <button
            onClick={decodeBase64}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Decode Base64
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
          <h2 className="font-semibold mb-2">Result:</h2>
          <pre className="whitespace-pre-wrap break-all">{result}</pre>
        </div>
      )}

    </ToolLayout>
  );
}
