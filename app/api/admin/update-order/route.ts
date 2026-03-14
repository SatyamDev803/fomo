import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { orderId, status } = await req.json();
    const ordersPath = path.join(process.cwd(), "data", "orders.json");
    let orders = [];
    try {
      const raw = fs.readFileSync(ordersPath, "utf-8");
      orders = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: "No orders found" }, { status: 404 });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updated = orders.map((o: any) =>
      o.orderId === orderId ? { ...o, orderStatus: status } : o
    );
    fs.writeFileSync(ordersPath, JSON.stringify(updated, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
