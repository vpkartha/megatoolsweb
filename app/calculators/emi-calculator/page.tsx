"use client";
import ToolLayout from "@/components/ToolLayout";

import { useState } from "react";


export default function EMICalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [interest, setInterest] = useState<number | null>(null);

  const calculateEMI = () => {
    const P = parseFloat(principal);
    const annualRate = parseFloat(rate);
    const N = parseFloat(tenure);

    if (!P || !annualRate || !N) return;

    const r = annualRate / 12 / 100; // monthly interest

    const emiValue =
      (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);

    const totalPayment = emiValue * N;
    const totalInterest = totalPayment - P;

    setEmi(parseFloat(emiValue.toFixed(2)));
    setTotal(parseFloat(totalPayment.toFixed(2)));
    setInterest(parseFloat(totalInterest.toFixed(2)));
  };

  const reset = () => {
    setPrincipal("");
    setRate("");
    setTenure("");
    setEmi(null);
    setTotal(null);
    setInterest(null);
  };

  return (
    <ToolLayout tool="calc-emicalculator">

      <h1 className="text-3xl font-bold mb-2">EMI Calculator</h1>
      <p className="text-gray-600 mb-6">
        Calculate monthly loan EMI, total payment, and interest.
      </p>

      {/* Inputs */}
      <div className="space-y-4">

        <input
          type="number"
          placeholder="Loan Amount (₹)"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />

        <input
          type="number"
          placeholder="Interest Rate (% per year)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />

        <input
          type="number"
          placeholder="Tenure (months)"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={calculateEMI}
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

      {/* Results */}
      {emi !== null && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50 space-y-2">

          <p>
            Monthly EMI: <span className="font-bold">₹ {emi}</span>
          </p>

          <p>
            Total Payment: <span className="font-bold">₹ {total}</span>
          </p>

          <p>
            Total Interest: <span className="font-bold">₹ {interest}</span>
          </p>

        </div>
      )}
</ToolLayout>
  );
}