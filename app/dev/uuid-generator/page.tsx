"use client";

import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";

export default function UuidGenerator() {
  const [count, setCount] = useState(1);
  const [list, setList] = useState<string[]>([]);

  // Generate UUID using native browser API
  const generateUUID = () => {
    return crypto.randomUUID();
  };

  const generate = () => {
    const arr: string[] = [];

    for (let i = 0; i < count; i++) {
      arr.push(generateUUID());
    }

    setList(arr);
  };

  const reset = () => {
    setCount(1);
    setList([]);
  };

  const copyOne = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      alert("Copied to clipboard");
    } catch {
      alert("Copy failed");
    }
  };

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(list.join("\n"));
      alert("All UUIDs copied");
    } catch {
      alert("Copy failed");
    }
  };

  return (
    <ToolLayout tool="dev-uuid-generator">

      <h1 className="text-3xl font-bold mb-2">
        UUID Generator
      </h1>

      <p className="text-gray-600 mb-6">
        Generate unique UUIDs instantly.
      </p>

      {/* COUNT INPUT */}
      <div className="mb-4">

        <label className="block font-medium mb-1">
          Number of UUIDs
        </label>

        <input
          type="number"
          min={1}
          max={20}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="border px-3 py-2 rounded w-full"
        />

      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3">

        <button
          onClick={generate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Generate
        </button>

        <button
          onClick={reset}
          className="border px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
        >
          Reset
        </button>

      </div>

      {/* OUTPUT */}
      {list.length > 0 && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">

          <div className="flex justify-between items-center mb-3">

            <h2 className="font-semibold">
              Generated UUIDs
            </h2>

            <button
              onClick={copyAll}
              className="text-sm border px-3 py-1 rounded hover:bg-gray-100 cursor-pointer"
            >
              Copy All
            </button>

          </div>

          <ul className="space-y-2">

            {list.map((id, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-white border rounded px-3 py-2"
              >
                <span className="font-mono break-all">
                  {id}
                </span>

                <button
                  onClick={() => copyOne(id)}
                  className="text-sm border px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
                >
                  Copy
                </button>

              </li>
            ))}

          </ul>

        </div>
      )}

    </ToolLayout>
  );
}