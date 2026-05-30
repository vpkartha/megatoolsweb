"use client";

import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";

export default function InchesToCm() {

  const [inches, setInches] = useState("");
  const [cm, setCm] = useState<number | null>(null);

  const convert = () => {

    if (!inches) return;

    const value = parseFloat(inches);

    if (isNaN(value)) {
      setCm(null);
      return;
    }

    // 1 inch = 2.54 cm
    const result = value * 2.54;

    setCm(parseFloat(result.toFixed(4)));
  };

  const reset = () => {
    setInches("");
    setCm(null);
  };

  return (

    <ToolLayout tool="conv-inches-to-cm">

      <h1 className="text-3xl font-bold mb-2">
        Inches to CM Converter
      </h1>

      <p className="text-gray-600 mb-6">
        Convert inches into centimeters instantly.
      </p>

      {/* Input */}
      <div className="space-y-4">

        <input
          type="number"
          value={inches}
          onChange={(e) => setInches(e.target.value)}
          placeholder="Enter value in inches"
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
      {cm !== null && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">

          <p className="text-gray-600">
            Result:
          </p>

          <p className="text-xl font-bold">
            {inches} inches = {cm} cm
          </p>

        </div>
      )}

    </ToolLayout>

  );
}