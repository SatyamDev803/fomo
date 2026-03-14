import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { amount, orderId } = await req.json();

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret || keyId === "placeholder_add_later") {
      return NextResponse.json({ error: "Razorpay not configured" }, { status: 400 });
    }

    const Razorpay = (await import("razorpay")).default;
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: "INR",
      receipt: orderId,
    });

    return NextResponse.json(order);
  } catch (err) {
    console.error("Razorpay order error:", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
