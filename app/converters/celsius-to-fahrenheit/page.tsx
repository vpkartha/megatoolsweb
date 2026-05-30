"use client";

import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";

export default function CelsiusToFahrenheit() {

  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState<number | null>(null);

  const convert = () => {

    if (celsius === "") return;

    const value = parseFloat(celsius);

    if (isNaN(value)) {
      setFahrenheit(null);
      return;
    }

    // Formula: F = (C × 9/5) + 32
    const result = (value * 9) / 5 + 32;

    setFahrenheit(parseFloat(result.toFixed(2)));
  };

  const reset = () => {
    setCelsius("");
    setFahrenheit(null);
  };

  return (

    <ToolLayout tool="conv-celsius-to-fahrenheit">

      <h1 className="text-3xl font-bold mb-2">
        Celsius to Fahrenheit Converter
      </h1>

      <p className="text-gray-600 mb-6">
        Convert temperature from Celsius to Fahrenheit instantly.
      </p>

      {/* Input */}
      <div className="space-y-4">

        <input
          type="number"
          value={celsius}
          onChange={(e) => setCelsius(e.target.value)}
          placeholder="Enter temperature in °C"
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
      {fahrenheit !== null && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">

          <p className="text-gray-600">Result:</p>

          <p className="text-xl font-bold">
            {celsius}°C = {fahrenheit}°F
          </p>

        </div>
      )}

    </ToolLayout>

  );
}