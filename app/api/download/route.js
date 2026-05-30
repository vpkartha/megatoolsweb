import { NextResponse } from "next/server";
import { hasAccess } from "@/lib/access";

export async function POST(req) {
  const body = await req.json();

  const { userId, tool } = body;

  // Check payment access
  if (!hasAccess(userId, tool)) {
    return NextResponse.json(
      { error: "Payment required" },
      { status: 403 }
    );
  }

  // TEMP file URL
  return NextResponse.json({
    url: "https://example.com/file.exe"
  });
}