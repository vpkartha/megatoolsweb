"use client";
import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";

export default function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!h || !w) return;

    // height in meters (convert cm → m if needed)
    const heightInM = h > 3 ? h / 100 : h;

    const result = w / (heightInM * heightInM);
    const rounded = parseFloat(result.toFixed(2));

    setBmi(rounded);

    if (rounded < 18.5) setCategory("Underweight");
    else if (rounded < 25) setCategory("Normal");
    else if (rounded < 30) setCategory("Overweight");
    else setCategory("Obese");
  };

  const reset = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setCategory("");
  };

  return (
    <ToolLayout tool="calc-bmicalculator">

      <h1 className="text-3xl font-bold mb-2">BMI Calculator</h1>
      <p className="text-gray-600 mb-6">
        Calculate your Body Mass Index based on height and weight.
      </p>

      {/* Inputs */}
      <div className="space-y-4">

        <input
          type="number"
          placeholder="Height (cm or meters)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />

        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={calculateBMI}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Calculate
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
      {bmi !== null && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <p className="text-lg">
            Your BMI: <span className="font-bold">{bmi}</span>
          </p>
          <p className="text-md mt-1">
            Category: <span className="font-semibold">{category}</span>
          </p>
        </div>
      )}
</ToolLayout>
  );
}