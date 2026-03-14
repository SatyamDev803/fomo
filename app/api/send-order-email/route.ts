import { NextRequest, NextResponse } from "next/server";
import { CartItem } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const { orderId, customer, items, total, paymentId } = await req.json();
    const resendKey = process.env.RESEND_API_KEY;

    const itemsHtml = (items as CartItem[])
      .map(
        (item) =>
          `<tr>
            <td style="padding:6px 0;border-bottom:1px solid #f1f5f9">${item.name}</td>
            <td style="padding:6px 0;border-bottom:1px solid #f1f5f9;text-align:center">x${item.quantity}</td>
            <td style="padding:6px 0;border-bottom:1px solid #f1f5f9;text-align:right">₹${(item.price * item.quantity).toLocaleString("en-IN")}</td>
          </tr>`
      )
      .join("");

    const emailHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
        <div style="background:#c084fc;padding:24px;text-align:center">
          <h1 style="color:white;font-size:28px;margin:0">🎁 New Order Received!</h1>
        </div>
        <div style="padding:24px">
          <p style="font-size:16px;color:#475569"><strong>Order ID:</strong> ${orderId}</p>
          <p style="font-size:16px;color:#475569"><strong>Payment ID:</strong> ${paymentId || "Pending"}</p>
          <h2 style="color:#1e293b;margin-top:20px">Customer Details</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;color:#475569">
            <tr><td style="padding:4px 0;width:120px"><strong>Name</strong></td><td>${customer.fullName}</td></tr>
            <tr><td style="padding:4px 0"><strong>Phone</strong></td><td>${customer.phone}</td></tr>
            <tr><td style="padding:4px 0"><strong>Email</strong></td><td>${customer.email}</td></tr>
            <tr><td style="padding:4px 0"><strong>Address</strong></td><td>${customer.address1}${customer.address2 ? ", " + customer.address2 : ""}, ${customer.city}, ${customer.state} - ${customer.pinCode}</td></tr>
          </table>
          <h2 style="color:#1e293b;margin-top:20px">Items Ordered</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;color:#475569">
            <thead>
              <tr style="background:#f8fafc">
                <th style="text-align:left;padding:8px 0">Product</th>
                <th style="text-align:center;padding:8px 0">Qty</th>
                <th style="text-align:right;padding:8px 0">Price</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          <div style="margin-top:16px;text-align:right;font-size:18px;font-weight:bold;color:#1e293b">
            Total: ₹${total.toLocaleString("en-IN")}
          </div>
        </div>
        <div style="background:#f8fafc;padding:16px;text-align:center;font-size:12px;color:#94a3b8">
          FOMO Gifting • forourmomentsfomo@gmail.com • 8882159187
        </div>
      </div>
    `;

    if (resendKey && resendKey !== "placeholder_add_later") {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "FOMO Gifting <orders@fomogiving.com>",
        to: "forourmomentsfomo@gmail.com",
        subject: `🎁 New Order: ${orderId} — ₹${total.toLocaleString("en-IN")}`,
        html: emailHtml,
      });
    } else {
      console.log("Resend not configured. Order details:", { orderId, customer, total });
    }

    // Save order to orders.json
    const fs = await import("fs");
    const path = await import("path");
    const ordersPath = path.join(process.cwd(), "data", "orders.json");
    let orders = [];
    try {
      const raw = fs.readFileSync(ordersPath, "utf-8");
      orders = JSON.parse(raw);
    } catch {
      orders = [];
    }
    orders.push({
      orderId,
      customerName: customer.fullName,
      phone: customer.phone,
      email: customer.email,
      address: {
        line1: customer.address1,
        line2: customer.address2,
        city: customer.city,
        state: customer.state,
        pinCode: customer.pinCode,
      },
      items,
      total,
      paymentId,
      orderStatus: "pending",
      createdAt: new Date().toISOString(),
    });
    fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email/order error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
