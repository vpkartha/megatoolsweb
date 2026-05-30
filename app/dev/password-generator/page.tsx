
"use client";

import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const [password, setPassword] = useState("");

  const generatePassword = () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let chars = "";

    if (includeUpper) chars += upper;
    if (includeLower) chars += lower;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (!chars) {
      setPassword("");
      return;
    }

    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }

    setPassword(result);
  };

  const reset = () => {
    setPassword("");
    setLength(12);
    setIncludeUpper(true);
    setIncludeLower(true);
    setIncludeNumbers(true);
    setIncludeSymbols(true);
  };

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password);
      alert("Password copied to clipboard");
    } catch {
      alert("Copy failed");
    }
  };

  return (
    <ToolLayout tool="text-password-generator">

      <h1 className="text-3xl font-bold mb-2">
        Password Generator
      </h1>

      <p className="text-gray-600 mb-6">
        Generate strong and secure passwords instantly.
      </p>

      {/* LENGTH */}
      <div className="mb-4">
        <label className="block font-medium mb-1">
          Password Length: {length}
        </label>

        <input
          type="range"
          min="6"
          max="32"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* OPTIONS */}
      <div className="space-y-2 mb-4">

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeUpper}
            onChange={() => setIncludeUpper(!includeUpper)}
          />
          Uppercase (A-Z)
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeLower}
            onChange={() => setIncludeLower(!includeLower)}
          />
          Lowercase (a-z)
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          Numbers (0-9)
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
          Symbols (!@#$)
        </label>

      </div>

      {/* BUTTONS */}
      <div className="flex gap-3 mb-6">

        <button
          onClick={generatePassword}
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
      {password && (
        <div className="p-4 border rounded-lg bg-gray-50">

          <div className="flex justify-between items-center mb-2">

            <h2 className="font-semibold">
              Generated Password
            </h2>

            <button
              onClick={copyPassword}
              className="text-sm border px-3 py-1 rounded hover:bg-gray-100 cursor-pointer"
            >
              Copy
            </button>

          </div>

          <p className="break-all font-mono text-lg">
            {password}
          </p>

        </div>
      )}

    </ToolLayout>
  );
}