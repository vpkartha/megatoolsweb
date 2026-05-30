"use client";

import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";

export default function LbsToKg() {

  const [lbs, setLbs] = useState("");
  const [kg, setKg] = useState<number | null>(null);

  const convert = () => {

    if (!lbs) return;

    const value = parseFloat(lbs);

    if (isNaN(value)) {
      setKg(null);
      return;
    }

    // 1 lb = 0.453592 kg
    const result = value * 0.453592;

    setKg(parseFloat(result.toFixed(4)));
  };

  const reset = () => {
    setLbs("");
    setKg(null);
  };

  return (

    <ToolLayout tool="conv-lbs-to-kg">

      <h1 className="text-3xl font-bold mb-2">
        LBS to KG Converter
      </h1>

      <p className="text-gray-600 mb-6">
        Convert pounds into kilograms instantly.
      </p>

      {/* Input */}
      <div className="space-y-4">

        <input
          type="number"
          value={lbs}
          onChange={(e) => setLbs(e.target.value)}
          placeholder="Enter weight in lbs"
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
      {kg !== null && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">

          <p className="text-gray-600">
            Result:
          </p>

          <p className="text-xl font-bold">
            {lbs} lbs = {kg} kg
          </p>

        </div>
      )}

    </ToolLayout>

  );
}