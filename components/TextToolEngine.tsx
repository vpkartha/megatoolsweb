"use client";

import { useState } from "react";

import ToolLayout from "@/components/ToolLayout";

type TextToolConfig = {
  title: string;
  description: string;
  toolId: string;
  features: {
    words?: boolean;
    characters?: boolean;
    charactersNoSpace?: boolean;
    sentences?: boolean;
    lines?: boolean;
    readingTime?: boolean;
  };
};

export default function TextToolEngine({
  config,
}: {
  config: TextToolConfig;
}) {

  const [text, setText] = useState("");

  // ===== COUNTS =====

  const characters = text.length;

  const charactersNoSpace = text.replace(/\s/g, "").length;

  const words = text.trim()
    ? text.trim().split(/\s+/).length
    : 0;

  const sentences = text.trim()
    ? text
        .split(/[.!?]+/)
        .filter((s) => s.trim().length > 0).length
    : 0;

  const lines = text.length
    ? text.split("\n").length
    : 0;

  const readingTime = words > 0
    ? Math.ceil(words / 200)
    : 0;

  // ===== ACTIONS =====

  const reset = () => {
    setText("");
  };

  return (

    <ToolLayout tool={config.toolId}>

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-2">
        {config.title}
      </h1>

      {/* DESCRIPTION */}
      <p className="text-gray-600 mb-6">
        {config.description}
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
      <div className="mt-6 grid grid-cols-2 gap-4">

        {config.features.words && (
          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-gray-600">
              Words
            </p>
            <p className="text-xl font-bold">
              {words}
            </p>
          </div>
        )}

        {config.features.characters && (
          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-gray-600">
              Characters
            </p>
            <p className="text-xl font-bold">
              {characters}
            </p>
          </div>
        )}

        {config.features.charactersNoSpace && (
          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-gray-600">
              Characters (no spaces)
            </p>
            <p className="text-xl font-bold">
              {charactersNoSpace}
            </p>
          </div>
        )}

        {config.features.sentences && (
          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-gray-600">
              Sentences
            </p>
            <p className="text-xl font-bold">
              {sentences}
            </p>
          </div>
        )}

        {config.features.lines && (
          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-gray-600">
              Lines
            </p>
            <p className="text-xl font-bold">
              {lines}
            </p>
          </div>
        )}

        {config.features.readingTime && (
          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-gray-600">
              Reading Time
            </p>
            <p className="text-xl font-bold">
              {readingTime} min
            </p>
          </div>
        )}

      </div>

      {/* FEEDBACK */}


    </ToolLayout>

  );
}