"use client";
import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";

export default function GSTCalculator() {
  const [amount, setAmount] = useState("");
  const [gstRate, setGstRate] = useState("");
  const [type, setType] = useState<"add" | "remove">("add");

  const [result, setResult] = useState<{
    base: number;
    gst: number;
    total: number;
  } | null>(null);

  const calculateGST = () => {
    const value = parseFloat(amount);
    const rate = parseFloat(gstRate);

    if (!value || !rate) return;

    if (type === "add") {
      const gstAmount = (value * rate) / 100;
      const total = value + gstAmount;

      setResult({
        base: value,
        gst: gstAmount,
        total,
      });
    } else {
      const base = value / (1 + rate / 100);
      const gstAmount = value - base;

      setResult({
        base,
        gst: gstAmount,
        total: value,
      });
    }
  };

  const reset = () => {
    setAmount("");
    setGstRate("");
    setResult(null);
  };

  return (
    <ToolLayout tool="calc-gstcalculator">

      <h1 className="text-3xl font-bold mb-2">GST Calculator</h1>
      <p className="text-gray-600 mb-6">
        Add or remove GST from product prices easily.
      </p>

      {/* Toggle */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setType("add")}
          className={`px-3 py-1 rounded border ${
            type === "add" ? "bg-blue-600 text-white" : ""
          }`}
        >
          Add GST
        </button>

        <button
          onClick={() => setType("remove")}
          className={`px-3 py-1 rounded border ${
            type === "remove" ? "bg-blue-600 text-white" : ""
          }`}
        >
          Remove GST
        </button>
      </div>

      {/* Inputs */}
      <div className="space-y-4">

        <input
          type="number"
          placeholder={type === "add" ? "Base Price (₹)" : "Final Price (₹)"}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />

        <input
          type="number"
          placeholder="GST Rate (%)"
          value={gstRate}
          onChange={(e) => setGstRate(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={calculateGST}
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
      {result && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50 space-y-2">

          <p>
            Base Amount: <span className="font-bold">₹ {result.base.toFixed(2)}</span>
          </p>

          <p>
            GST Amount: <span className="font-bold">₹ {result.gst.toFixed(2)}</span>
          </p>

          <p>
            Total: <span className="font-bold">₹ {result.total.toFixed(2)}</span>
          </p>

        </div>
      )}
</ToolLayout>
  );
}