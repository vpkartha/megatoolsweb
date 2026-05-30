"use client";
import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";
import AdSlot from "@/components/AdSlot";

export default function PercentageCalculator() {

  const [value, setValue] = useState("");
  const [percent, setPercent] = useState("");
  const [result, setResult] = useState<number | null>(null);

  function calculate() {

    const v = parseFloat(value);
    const p = parseFloat(percent);

    if (!isNaN(v) && !isNaN(p)) {
      setResult((v * p) / 100);
    }
  }

  return (

    <ToolLayout tool="calc-percentagecalculator">

      <h1 className="text-4xl font-bold mb-6">
        Percentage Calculator
      </h1>

      <div className="border rounded p-6 space-y-4">

        <AdSlot />

        <input
          type="number"
          placeholder="Enter value"
          className="border p-3 w-full rounded"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter percentage"
          className="border p-3 w-full rounded"
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
        />

        <button
          onClick={calculate}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Calculate
        </button>

        {result !== null && (

          <div className="text-2xl font-bold">

            Result: {result}

          </div>

        )}

        <AdSlot />

      </div>
</ToolLayout>

  );
}