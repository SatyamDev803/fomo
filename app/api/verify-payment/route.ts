import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret || keySecret === "placeholder_add_later") {
      return NextResponse.json({ error: "Not configured" }, { status: 400 });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(body)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;
    return NextResponse.json({ valid: isValid });
  } catch (err) {
    console.error("Payment verification error:", err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
