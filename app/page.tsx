"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const tools = [
  { name: "Percentage Calculator", href: "/calculators/percentage-calculator", category: "Calculators", description: "Calculate percentages quickly and accurately.", icon: "🧮" },
  { name: "BMI Calculator", href: "/calculators/bmi-calculator", category: "Calculators", description: "Check your Body Mass Index instantly.", icon: "⚖️" },
  { name: "Age Calculator", href: "/calculators/age-calculator", category: "Calculators", description: "Calculate exact age from birth date.", icon: "🎂" },
  { name: "EMI Calculator", href: "/calculators/emi-calculator", category: "Calculators", description: "Loan EMI calculation tool.", icon: "🏦" },
  { name: "GST Calculator", href: "/calculators/gst-calculator", category: "Calculators", description: "Calculate GST easily.", icon: "🧾" },

  { name: "CM to Inches", href: "/converters/cm-to-inches", category: "Converters", description: "Convert CM to Inches.", icon: "📏" },
  { name: "Inches to CM", href: "/converters/inches-to-cm", category: "Converters", description: "Convert Inches to CM.", icon: "📐" },
  { name: "KG to LBS", href: "/converters/kg-to-lbs", category: "Converters", description: "Convert KG to LBS.", icon: "⚖️" },
  { name: "LBS to KG", href: "/converters/lbs-to-kg", category: "Converters", description: "Convert LBS to KG.", icon: "⚙️" },
  { name: "Binary to Decimal", href: "/converters/binary-to-decimal", category: "Converters", description: "Binary conversion tool.", icon: "💡" },
  { name: "Celsius to Fahrenheit", href: "/converters/celsius-to-fahrenheit", category: "Converters", description: "Temperature converter.", icon: "🌡️" },

  { name: "Word Counter", href: "/text/word-counter", category: "Text Tools", description: "Count words in text.", icon: "📝" },
  { name: "Character Counter", href: "/text/character-counter", category: "Text Tools", description: "Count characters easily.", icon: "🔤" },
  { name: "Case Converter", href: "/text/case-converter", category: "Text Tools", description: "Convert text case.", icon: "🔠" },
  { name: "Remove Duplicate Lines", href: "/text/remove-duplicate-lines", category: "Text Tools", description: "Remove duplicate lines from a block of text.", icon: "🔠" },
  { name: "Text Separator / Joiner", href: "/text/text-separator-joiner", category: "Text Tools", description: "Separate or Join Text depending on a word.", icon: "🔠" },
  { name: "Remove Extra Spaces", href: "/text/remove-extra-spaces", category: "Text Tools", description: "Remove Extra spaces from a block of text.", icon: "🔠" },
  { name: "Find & Replace Text", href: "/text/find-replace", category: "Text Tools", description: "Find and Replace Text.", icon: "🔠" },
  { name: "Line Counter", href: "/text/line-counter", category: "Text Tools", description: "Counts number of lines in a text block.", icon: "🔠" },
  { name: "Number the lines", href: "/text/numbering-tool", category: "Text Tools", description: "Adds numbering to each line.", icon: "🔠" },
  { name: "Reverse Text", href: "/text/reverse-text", category: "Text Tools", description: "Reverse text from right to left.", icon: "🔠" },
  { name: "Sort Lines", href: "/text/sort-lines", category: "Text Tools", description: "Sort lines alphabetically (A→Z or Z→A).", icon: "🔠" },
  { name: "Text to Ascii Conversion", href: "/text/text-ascii", category: "Text Tools", description: "Text to Ascii & Vice Versa Conversion", icon: "🔠" },
  { name: "Text to Binary / Binary to Text", href: "/text/text-binary", category: "Text Tools", description: "Text to Binary & Vice Versa Conversion", icon: "🔠" },
  { name: "URL Encoder / Decoder", href: "/text/url-encoder-decoder", category: "Text Tools", description: "URL Encoder / Decoder tool", icon: "🔠" },
  { name: "Encode / Decode Base64", href: "/text/base64-encoder-decoder", category: "Text Tools", description: "Base64 Encoder / Decoder tool", icon: "🔠" },


  { name: "Merge PDF", href: "/pdftools/merge-pdf", category: "PDF Tools", description: "Merge multiple PDF files into one.", icon: "📄" },
  { name: "Split PDF", href: "/pdftools/split-pdf", category: "PDF Tools", description: "Split PDF pages easily.", icon: "✂️" },
  { name: "Compress PDF", href: "/pdftools/compress-pdf", category: "PDF Tools", description: "Reduce PDF file size.", icon: "🗜️" },
  
  { name: "Sign PDF", href: "/pdftools/sign-pdf", category: "PDF Tools", description: "Add signatures to PDFs.", icon: "✍️" },
  { name: "Images to PDF", href: "/pdftools/images-to-pdf", category: "PDF Tools", description: "Convert images into PDF.", icon: "🖼️" },
  { name: "Extract PDF Images", href: "/pdftools/extract-pdf-images", category: "PDF Tools", description: "Extract images from PDF.", icon: "📤" },
  { name: "Protect PDF", href: "/pdftools/protect-pdf", category: "PDF Tools", description: "Password protect PDF files.", icon: "🔒" },
  { name: "Unlock PDF", href: "/pdftools/unlock-pdf", category: "PDF Tools", description: "Remove PDF password protection.", icon: "🔓" },
  { name: "Rotate PDF Pages", href: "/pdftools/rotate-pdf", category: "PDF Tools", description: "Rotate PDF pages.", icon: "🔄" },
  { name: "Remove PDF Pages", href: "/pdftools/remove-pdf-pages", category: "PDF Tools", description: "Delete selected PDF pages.", icon: "❌" },
  { name: "Extract PDF Pages", href: "/pdftools/extract-pdf-pages", category: "PDF Tools", description: "Extract selected PDF pages.", icon: "📑" },
  { name: "Rearrange PDF Pages", href: "/pdftools/rearrange-pdf", category: "PDF Tools", description: "Reorder PDF pages.", icon: "↕️" },
  { name: "Add Watermark", href: "/pdftools/add-watermark", category: "PDF Tools", description: "Add watermark to PDFs.", icon: "💧" },
  { name: "Add Page Numbers", href: "/pdftools/add-page-numbers", category: "PDF Tools", description: "Insert page numbers into PDF.", icon: "🔢" },
  { name: "Web Optimize PDF", href: "/pdftools/web-optimize-pdf", category: "PDF Tools", description: "Optimize PDF for web usage.", icon: "🌐" },
  { name: "Redact PDF", href: "/pdftools/redact-pdf", category: "PDF Tools", description: "Blackout sensitive PDF text.", icon: "⬛" },
  { name: "Create PDF", href: "/pdftools/create-pdf", category: "PDF Tools", description: "Create PDF from text or images.", icon: "📘" },

  { name: "JSON Formatter", href: "/dev/json-formatter", category: "Developer Tools", description: "Beautify JSON.", icon: "💻" },
  { name: "Base64 Encoder", href: "/dev/base64-encoder", category: "Developer Tools", description: "Encode Base64.", icon: "🔐" },
  { name: "URL Encoder", href: "/dev/url-encoder", category: "Developer Tools", description: "Encode URLs.", icon: "🌐" },
  { name: "Password Generator", href: "/dev/password-generator", category: "Developer Tools", description: "Generate strong passwords.", icon: "🔑" },
  { name: "QR Code Generator", href: "/dev/qr-generator", category: "Developer Tools", description: "Create QR codes.", icon: "⬛" },
  { name: "Markdown Preview", href: "/dev/markdown-preview", category: "Developer Tools", description: "Preview markdown.", icon: "📄" },
  { name: "Hash Generator", href: "/dev/hash-generator", category: "Developer Tools", description: "Generate hashes.", icon: "#️⃣" },
  { name: "UUID Generator", href: "/dev/uuid-generator", category: "Developer Tools", description: "Generate UUIDs.", icon: "🆔" },
  { name: "Regex Tester", href: "/dev/regex-tester", category: "Developer Tools", description: "Test regex.", icon: "🔍" },

  { name: "Image Resizer", href: "/image/resizer", category: "Image", description: "Resize images.", icon: "🖼️" },
  { name: "Image Compressor", href: "/image/compressor", category: "Image", description: "Compress images.", icon: "📉" },
  { name: "Image Converter", href: "/image/converter", category: "Image", description: "Convert images.", icon: "🔄" },
  { name: "Image Cropper", href: "/image/cropper", category: "Image", description: "Crop images.", icon: "✂️" },
  { name: "Image Metadata Viewer", href: "/image/metadata", category: "Image", description: "View image metadata.", icon: "ℹ️" },

  { name: "File Search Pro", href: "/paid/file-search-pro", category: "Paid Tools", description: "Fast file search.", icon: "📁" },
  { name: "Bulk File Renamer Pro", href: "/paid/bulk-renamer-pro", category: "Paid Tools", description: "Bulk rename files.", icon: "✏️" },
  { name: "Advanced PDF Merger", href: "/paid/pdf-merger-pro", category: "Paid Tools", description: "Merge PDFs.", icon: "📄" },
  { name: "Advanced PDF Splitter", href: "/paid/pdf-splitter-pro", category: "Paid Tools", description: "Split PDFs.", icon: "✂️" },
  { name: "Excel Data Cleaner", href: "/paid/excel-cleaner", category: "Paid Tools", description: "Clean Excel data.", icon: "📊" },
  { name: "Data Export Suite", href: "/paid/data-export-suite", category: "Paid Tools", description: "Export data.", icon: "📤" },
];

const categories = [
  "All",
  "Calculators",
  "Converters",
  "Text Tools",
  "PDF Tools",
  "Developer Tools",
  "Image",
  "Paid Tools",
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [activeTool, setActiveTool] =
    useState<string | null>(null);

  useEffect(() => {
    const saved =
      localStorage.getItem("selectedCategory");

    if (saved && categories.includes(saved)) {
      setSelectedCategory(saved);
    } else {
      setSelectedCategory("All");
    }
  }, []);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);

    localStorage.setItem(
      "selectedCategory",
      cat
    );
  };

  const filteredTools = useMemo(() => {

  let result =
    selectedCategory === "All"
      ? [...tools]
      : tools.filter(
          (tool) =>
            tool.category === selectedCategory
        );

  return result.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

}, [selectedCategory]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-purple-700 text-white py-5">

        <h1 className="text-4xl font-bold text-center">
          Mega Tools Web
        </h1>

        <p className="text-center text-sm mt-1 text-blue-100">
          Fast & Compact Tool Dashboard
        </p>

      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto p-3">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 items-start">

          {/* LEFT SIDE */}
          <div className="lg:col-span-4">

            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.6fr] gap-3">

              {/* PANEL 1 */}
              <div className="bg-white rounded-xl shadow overflow-hidden">

                <div className="bg-indigo-700 text-white p-2 text-xs font-bold">
                  Categories
                </div>

                <div className="p-2 space-y-1.5">

                  {categories.map((cat) => (

                    <button
                      key={cat}
                      onClick={() =>
                        handleCategoryChange(cat)
                      }
                      className={`w-full text-left px-2 py-1.5 rounded text-xs font-medium border transition ${
                        selectedCategory === cat
                          ? "bg-blue-600 text-white border-blue-700"
                          : "bg-blue-50 hover:bg-blue-100 border-gray-300"
                      }`}
                    >
                      {cat}
                    </button>

                  ))}

                </div>

              </div>

                {/* PANEL 2 */}
              <div className="bg-white rounded-xl shadow overflow-hidden">

                <div className="bg-[#b8005c] text-white p-2 text-xs font-bold">
                  Tools
                </div>

                <div className="p-2 space-y-1.5">

                  {filteredTools.map((tool, i) => (

                    <Link
                      key={i}
                      href={tool.href}
                      onClick={() =>
                        setActiveTool(tool.name)
                      }
                      className={`flex items-center gap-2 px-2 py-1.5 text-xs rounded border transition ${
                        activeTool === tool.name
                          ? "bg-blue-600 text-white border-blue-700"
                          : "bg-slate-50 hover:bg-blue-100 border-gray-300"
                      }`}
                    >

                      {/* SERIAL NUMBER */}
                      <span className="min-w-[22px] text-center font-bold">
                        {`${String(i + 1).padStart(2, "0")}.`}
                      </span>

                      {/* TOOL NAME */}
                      <span className="truncate">
                        {tool.name}
                      </span>

                    </Link>

                  ))}

                </div>

              </div>

               {/* PANEL 3 */}
              <div className="bg-white rounded-xl shadow overflow-hidden">

                <div className="bg-green-600 text-white p-2 text-xs font-bold">
                  Description
                </div>

                <div className="p-2 space-y-1.5">

                  {filteredTools.map((tool, i) => (

                    <div
                      key={i}
                      onClick={() =>
                        setActiveTool(tool.name)
                      }
                      className={`block w-full px-2 py-2 text-xs rounded border transition cursor-pointer ${
                        activeTool === tool.name
                          ? "bg-green-200 border-green-600 shadow-sm"
                          : "bg-green-50 hover:bg-green-100 border-gray-300"
                      }`}
                    >

                      <div className="text-gray-700 leading-none">
                        {tool.description}
                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT ADS SIDEBAR */}
          <div className="space-y-3 lg:sticky lg:top-4 h-fit">

            <div className="h-40 bg-white border rounded-xl flex items-center justify-center text-xs text-gray-500">
              Adsense 1
            </div>

            <div className="h-40 bg-white border rounded-xl flex items-center justify-center text-xs text-gray-500">
              Adsense 2
            </div>

            <div className="h-40 bg-white border rounded-xl flex items-center justify-center text-xs text-gray-500">
              Adsense 3
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}