"use client";

import ToolLayout from "@/components/ToolLayout";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState<string>(`
# Hello Markdown 👋

This is a **Markdown Preview Tool**

## Features
- Live preview
- Tables support
- Lists support
- Links support

### Example Table

| Name | Age |
|------|-----|
| John | 25  |
| Jane | 30  |

### Code

\`\`\`js
console.log("Hello World");
\`\`\`
`);

  const reset = () => {
    setMarkdown("");
  };

  const copyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      alert("Copied to clipboard");
    } catch {
      alert("Copy failed");
    }
  };

  return (
    <ToolLayout tool="text-markdown-preview">

      <h1 className="text-3xl font-bold mb-2">
        Markdown Preview
      </h1>

      <p className="text-gray-600 mb-6">
        Write Markdown on the left and see live preview on the right.
      </p>

      {/* ACTIONS */}
      <div className="flex gap-3 mb-4">

        <button
          onClick={reset}
          className="border px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
        >
          Reset
        </button>

        <button
          onClick={copyMarkdown}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Copy Markdown
        </button>

      </div>

      {/* TWO COLUMN LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* INPUT */}
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="w-full border rounded-lg p-3 h-[500px] font-mono"
          placeholder="Write markdown here..."
        />

        {/* PREVIEW */}
        <div className="border rounded-lg p-4 bg-white h-[500px] overflow-auto prose max-w-none">

          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {markdown}
          </ReactMarkdown>

        </div>

      </div>

    </ToolLayout>
  );
}