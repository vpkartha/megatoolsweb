"use client";

import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState("");

  const runRegex = () => {
    setError("");
    setMatches([]);

    if (!pattern) return;

    try {
      const regex = new RegExp(pattern, flags);
      const result: string[] = [];

      let match;

      // Reset lastIndex for global regex safety
      while ((match = regex.exec(text)) !== null) {
        result.push(match[0]);

        if (!flags.includes("g")) break;
      }

      setMatches(result);
    } catch (e: any) {
      setError("Invalid Regex Pattern");
    }
  };

  const reset = () => {
    setPattern("");
    setFlags("g");
    setText("");
    setMatches([]);
    setError("");
  };

  const copyMatches = async () => {
    try {
      await navigator.clipboard.writeText(matches.join("\n"));
      alert("Copied to clipboard");
    } catch {
      alert("Copy failed");
    }
  };

  return (
    <ToolLayout tool="text-regex-tester">

      <h1 className="text-3xl font-bold mb-2">
        Regex Tester
      </h1>

      <p className="text-gray-600 mb-6">
        Test and debug regular expressions in real time.
      </p>

      {/* PATTERN */}
      <input
        type="text"
        value={pattern}
        onChange={(e) => setPattern(e.target.value)}
        placeholder="Enter regex pattern (e.g. \\d+)"
        className="w-full border rounded px-3 py-2 mb-3 font-mono"
      />

      {/* FLAGS */}
      <input
        type="text"
        value={flags}
        onChange={(e) => setFlags(e.target.value)}
        placeholder="Flags (g, i, m)"
        className="w-full border rounded px-3 py-2 mb-3"
      />

      {/* TEXT */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter test text..."
        className="w-full border rounded px-3 py-2 h-40 font-mono"
      />

      {/* BUTTONS */}
      <div className="flex gap-3 mt-4">

        <button
          onClick={runRegex}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Test Regex
        </button>

        <button
          onClick={reset}
          className="border px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
        >
          Reset
        </button>

      </div>

      {/* ERROR */}
      {error && (
        <div className="mt-4 text-red-600 font-medium">
          {error}
        </div>
      )}

      {/* RESULTS */}
      {matches.length > 0 && (
        <div className="mt-6 p-4 border rounded bg-gray-50">

          <div className="flex justify-between items-center mb-2">

            <h2 className="font-semibold">
              Matches ({matches.length})
            </h2>

            <button
              onClick={copyMatches}
              className="text-sm border px-3 py-1 rounded hover:bg-gray-100 cursor-pointer"
            >
              Copy All
            </button>

          </div>

          <ul className="space-y-1 font-mono text-sm">

            {matches.map((m, i) => (
              <li key={i} className="bg-white border px-2 py-1 rounded">
                {m}
              </li>
            ))}

          </ul>

        </div>
      )}

    </ToolLayout>
  );
}