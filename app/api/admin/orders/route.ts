import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const ordersPath = path.join(process.cwd(), "data", "orders.json");
    let orders = [];
    try {
      const raw = fs.readFileSync(ordersPath, "utf-8");
      orders = JSON.parse(raw);
    } catch {
      orders = [];
    }
    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ error: "Failed to load orders" }, { status: 500 });
  }
}
