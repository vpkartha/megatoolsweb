"use client";

import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";

export default function BinaryToDecimal() {

  const [binary, setBinary] = useState("");
  const [decimal, setDecimal] = useState<number | null>(null);
  const [error, setError] = useState("");

  const convert = () => {

    if (!binary) return;

    // Validate binary input
    if (!/^[01]+$/.test(binary)) {
      setError("Please enter a valid binary number (only 0 and 1).");
      setDecimal(null);
      return;
    }

    setError("");

    const result = parseInt(binary, 2);

    setDecimal(result);
  };

  const reset = () => {
    setBinary("");
    setDecimal(null);
    setError("");
  };

  return (

    <ToolLayout tool="conv-binary-to-decimal">

      <h1 className="text-3xl font-bold mb-2">
        Binary to Decimal Converter
      </h1>

      <p className="text-gray-600 mb-6">
        Convert binary numbers (0s and 1s) into decimal instantly.
      </p>

      {/* Input */}
      <div className="space-y-4">

        <input
          type="text"
          value={binary}
          onChange={(e) => setBinary(e.target.value)}
          placeholder="Enter binary number (e.g. 10101)"
          className="w-full border rounded-lg px-4 py-2"
        />

        {/* Buttons */}
        <div className="flex gap-3">

          <button
            onClick={convert}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Convert
          </button>

          <button
            onClick={reset}
            className="border px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            Reset
          </button>

        </div>

      </div>

      {/* Error */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
          {error}
        </div>
      )}

      {/* Result */}
      {decimal !== null && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">

          <p className="text-gray-600">Result:</p>

          <p className="text-xl font-bold">
            {binary} (binary) = {decimal} (decimal)
          </p>

        </div>
      )}

    </ToolLayout>

  );
}