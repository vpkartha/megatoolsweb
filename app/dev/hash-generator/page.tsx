"use client";

import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";
import CryptoJS from "crypto-js";

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashType, setHashType] = useState("sha256");
  const [output, setOutput] = useState("");

  const generateHash = () => {
    if (!input) return;

    let result = "";

    switch (hashType) {
      case "md5":
        result = CryptoJS.MD5(input).toString();
        break;
      case "sha1":
        result = CryptoJS.SHA1(input).toString();
        break;
      case "sha256":
        result = CryptoJS.SHA256(input).toString();
        break;
      case "sha512":
        result = CryptoJS.SHA512(input).toString();
        break;
      default:
        result = CryptoJS.SHA256(input).toString();
    }

    setOutput(result);
  };

  const reset = () => {
    setInput("");
    setOutput("");
    setHashType("sha256");
  };

  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(output);
      alert("Copied to clipboard");
    } catch {
      alert("Copy failed");
    }
  };

  return (
    <ToolLayout tool="dev-hash-generator">

      <h1 className="text-3xl font-bold mb-2">
        Hash Generator
      </h1>

      <p className="text-gray-600 mb-6">
        Generate MD5, SHA1, SHA256, and SHA512 hashes instantly.
      </p>

      {/* INPUT */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text..."
        className="w-full border rounded-lg px-4 py-3 h-32 font-mono"
      />

      {/* HASH TYPE */}
      <div className="mt-4">

        <select
          value={hashType}
          onChange={(e) => setHashType(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="md5">MD5</option>
          <option value="sha1">SHA1</option>
          <option value="sha256">SHA256</option>
          <option value="sha512">SHA512</option>
        </select>

      </div>

      {/* BUTTONS */}
      <div className="flex gap-3 mt-4">

        <button
          onClick={generateHash}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Generate
        </button>

        <button
          onClick={reset}
          className="border px-4 py-2 rounded hover:bg-gray-100"
        >
          Reset
        </button>

      </div>

      {/* OUTPUT */}
      {output && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">

          <div className="flex justify-between items-center mb-2">

            <h2 className="font-semibold">
              Output
            </h2>

            <button
              onClick={copyOutput}
              className="text-sm border px-3 py-1 rounded hover:bg-gray-100"
            >
              Copy
            </button>

          </div>

          <p className="break-all font-mono">
            {output}
          </p>

        </div>
      )}

    </ToolLayout>
  );
}