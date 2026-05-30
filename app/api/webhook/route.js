import { NextResponse } from "next/server";
import { grantAccess } from "@/lib/access";

export async function POST(req) {
  const body = await req.json();

  const { userId, tool, paymentStatus } = body;

  // Simulate successful payment
  if (paymentStatus === "success") {
    grantAccess(userId, tool);

    return NextResponse.json({
      success: true,
      message: "Access granted"
    });
  }

  return NextResponse.json(
    {
      success: false,
      message: "Payment failed"
    },
    { status: 400 }
  );
}