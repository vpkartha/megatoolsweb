"use client";

import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";

export default function CaseConverter() {

  const [text, setText] = useState("");

  // ===== CONVERSIONS =====

  const uppercase = text.toUpperCase();

  const lowercase = text.toLowerCase();

  const titlecase = text
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const sentencecase = text
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s*\w)/g, (char) =>
      char.toUpperCase()
    );

  const capitalizedcase = text
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase()
    )
    .join(" ");

  // ===== ACTIONS =====

  const reset = () => {
    setText("");
  };

  const copyText = async (value: string) => {

    try {

      await navigator.clipboard.writeText(value);

      alert("Copied to clipboard");

    } catch {

      alert("Copy failed");
    }
  };

  return (

    <ToolLayout tool="text-case-converter">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-2">
        Case Converter
      </h1>

      <p className="text-gray-600 mb-6">
        Convert text into uppercase, lowercase,
        title case, and sentence case instantly.
      </p>

      {/* TEXTAREA */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        className="w-full border rounded-lg px-4 py-3 h-40"
      />

      {/* BUTTONS */}
      <div className="flex gap-3 mt-4">

        <button
          onClick={reset}
          className="border px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
        >
          Reset
        </button>

      </div>

      {/* RESULTS */}
      <div className="mt-6 space-y-4">

        {/* UPPERCASE */}
        <div className="border rounded-lg p-4 bg-gray-50">

          <div className="flex justify-between items-center mb-2">

            <h2 className="font-semibold">
              UPPERCASE
            </h2>

            <button
              onClick={() => copyText(uppercase)}
              className="text-sm border px-3 py-1 rounded hover:bg-gray-100 cursor-pointer"
            >
              Copy
            </button>

          </div>

          <p className="break-words">
            {uppercase}
          </p>

        </div>

        {/* lowercase */}
        <div className="border rounded-lg p-4 bg-gray-50">

          <div className="flex justify-between items-center mb-2">

            <h2 className="font-semibold">
              lowercase
            </h2>

            <button
              onClick={() => copyText(lowercase)}
              className="text-sm border px-3 py-1 rounded hover:bg-gray-100 cursor-pointer"
            >
              Copy
            </button>

          </div>

          <p className="break-words">
            {lowercase}
          </p>

        </div>

        {/* Title Case */}
        <div className="border rounded-lg p-4 bg-gray-50">

          <div className="flex justify-between items-center mb-2">

            <h2 className="font-semibold">
              Title Case
            </h2>

            <button
              onClick={() => copyText(titlecase)}
              className="text-sm border px-3 py-1 rounded hover:bg-gray-100 cursor-pointer"
            >
              Copy
            </button>

          </div>

          <p className="break-words">
            {titlecase}
          </p>

        </div>

        {/* Sentence case */}
        <div className="border rounded-lg p-4 bg-gray-50">

          <div className="flex justify-between items-center mb-2">

            <h2 className="font-semibold">
              Sentence case
            </h2>

            <button
              onClick={() => copyText(sentencecase)}
              className="text-sm border px-3 py-1 rounded hover:bg-gray-100 cursor-pointer"
            >
              Copy
            </button>

          </div>

          <p className="break-words">
            {sentencecase}
          </p>

        </div>

        {/* Capitalized Case */}
        <div className="border rounded-lg p-4 bg-gray-50">

          <div className="flex justify-between items-center mb-2">

            <h2 className="font-semibold">
              Capitalized Case
            </h2>

            <button
              onClick={() => copyText(capitalizedcase)}
              className="text-sm border px-3 py-1 rounded hover:bg-gray-100 cursor-pointer"
            >
              Copy
            </button>

          </div>

          <p className="break-words">
            {capitalizedcase}
          </p>

        </div>

      </div>

    </ToolLayout>

  );
}