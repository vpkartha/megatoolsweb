"use client";

import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";

export default function AgeCalculator() {

  const [dob, setDob] = useState("");

  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);

  const calculateAge = () => {

    if (!dob) return;

    const birthDate = new Date(dob);

    const today = new Date();

    let years =
      today.getFullYear() - birthDate.getFullYear();

    let months =
      today.getMonth() - birthDate.getMonth();

    let days =
      today.getDate() - birthDate.getDate();

    // Adjust days
    if (days < 0) {

      months -= 1;

      const prevMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      );

      days += prevMonth.getDate();
    }

    // Adjust months
    if (months < 0) {

      years -= 1;

      months += 12;
    }

    setAge({
      years,
      months,
      days,
    });
  };

  const reset = () => {

    setDob("");

    setAge(null);
  };

  return (

    <ToolLayout tool="calc-agecalculator">

      <h1 className="text-3xl font-bold mb-2">
        Age Calculator
      </h1>

      <p className="text-gray-600 mb-6">
        Calculate your exact age in years, months, and days.
      </p>

      {/* Input */}
      <div className="space-y-4">

        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />

        {/* Buttons */}
        <div className="flex gap-3">

          <button
            onClick={calculateAge}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Calculate
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
      {age && (

        <div className="mt-6 p-4 border rounded-lg bg-gray-50 space-y-2">

          <p>
            Years:
            {" "}
            <span className="font-bold">
              {age.years}
            </span>
          </p>

          <p>
            Months:
            {" "}
            <span className="font-bold">
              {age.months}
            </span>
          </p>

          <p>
            Days:
            {" "}
            <span className="font-bold">
              {age.days}
            </span>
          </p>

        </div>

      )}

    </ToolLayout>

  );
}