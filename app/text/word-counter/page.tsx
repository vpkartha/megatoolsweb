"use client";

import TextToolEngine from "@/components/TextToolEngine";

export default function WordCounterPage() {
  return (
    <TextToolEngine
      config={{
        title: "Word Counter",
        description: "Count words, characters, and sentences instantly.",
        toolId: "text-word-counter",
        features: {
          words: true,
          characters: true,
          charactersNoSpace: true,
          sentences: true,
        },
      }}
    />
  );
}