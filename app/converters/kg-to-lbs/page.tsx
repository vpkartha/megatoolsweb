"use client";

import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";

export default function KgToLbs() {

  const [kg, setKg] = useState("");
  const [lbs, setLbs] = useState<number | null>(null);

  const convert = () => {

    if (!kg) return;

    const value = parseFloat(kg);

    if (isNaN(value)) {
      setLbs(null);
      return;
    }

    // 1 kg = 2.20462 lbs
    const result = value * 2.20462;

    setLbs(parseFloat(result.toFixed(4)));
  };

  const reset = () => {
    setKg("");
    setLbs(null);
  };

  return (

    <ToolLayout tool="conv-kg-to-lbs">

      <h1 className="text-3xl font-bold mb-2">
        KG to LBS Converter
      </h1>

      <p className="text-gray-600 mb-6">
        Convert kilograms into pounds instantly.
      </p>

      {/* Input */}
      <div className="space-y-4">

        <input
          type="number"
          value={kg}
          onChange={(e) => setKg(e.target.value)}
          placeholder="Enter weight in kg"
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
      {lbs !== null && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">

          <p className="text-gray-600">
            Result:
          </p>

          <p className="text-xl font-bold">
            {kg} kg = {lbs} lbs
          </p>

        </div>
      )}

    </ToolLayout>

  );
}