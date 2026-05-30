export const runtime = "nodejs";

import { NextResponse } from "next/server";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";

export async function POST(req: Request) {
  try {
    console.log("API HIT: /api/extract");

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Load PDF
    const loadingTask = pdfjsLib.getDocument({ data: buffer });
    const pdf = await loadingTask.promise;

    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item: any) => item.str);
      fullText += strings.join(" ") + "\n";
    }

    return NextResponse.json({ text: fullText });
  } catch (err: any) {
    console.error("PDF extract error:", err);
    return NextResponse.json(
      { error: "Failed to extract text", details: err.message },
      { status: 500 }
    );
  }
}
