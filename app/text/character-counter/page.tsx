"use client";

import TextToolEngine from "@/components/TextToolEngine";

export default function CharacterCounterPage() {
  return (
    <TextToolEngine
      config={{
        title: "Character Counter",
        description: "Count characters, words, and lines instantly.",
        toolId: "text-character-counter",
        features: {
          characters: true,
          charactersNoSpace: true,
          words: true,
          lines: true,
        },
      }}
    />
  );
}