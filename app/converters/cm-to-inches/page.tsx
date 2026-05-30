"use client";

import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";

export default function CmToInches() {
  const [cm, setCm] = useState("");
  const [inches, setInches] = useState<number | null>(null);

  const convert = () => {
    if (!cm) return;

    const value = parseFloat(cm);

    if (isNaN(value)) {
      setInches(null);
      return;
    }

    // 1 cm = 0.393701 inches
    const result = value * 0.393701;

    setInches(parseFloat(result.toFixed(4)));
  };

  const reset = () => {
    setCm("");
    setInches(null);
  };

  return (
    <ToolLayout tool="calc-cm-to-inches">

      <h1 className="text-3xl font-bold mb-2">
        CM to Inches Converter
      </h1>

      <p className="text-gray-600 mb-6">
        Convert centimeters to inches instantly.
      </p>

      {/* Input */}
      <div className="space-y-4">

        <input
          type="number"
          value={cm}
          onChange={(e) => setCm(e.target.value)}
          placeholder="Enter value in cm"
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

      {/* Result */}
      {inches !== null && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">

          <p className="text-gray-600">
            Result:
          </p>

          <p className="text-xl font-bold">
            {cm} cm = {inches} inches
          </p>

        </div>
      )}

    </ToolLayout>
  );
}