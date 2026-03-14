"use client";

import { useState, useEffect } from "react";
import { formatPrice } from "@/lib/utils";
import { LogOut, Package, TrendingUp, Clock } from "lucide-react";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  orderId: string;
  customerName: string;
  phone: string;
  email: string;
  address: {
    line1: string;
    city: string;
    state: string;
    pinCode: string;
  };
  items: OrderItem[];
  total: number;
  orderStatus: "pending" | "packed" | "shipped" | "delivered";
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  packed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
};

const STATUS_OPTIONS = ["pending", "packed", "shipped", "delivered"];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookie = document.cookie.includes("fomo_admin=true");
      if (cookie) {
        setAuthed(true);
        loadOrders();
      }
    }
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPass = "fomo2025admin";
    if (password === adminPass) {
      document.cookie = "fomo_admin=true; path=/; max-age=86400";
      setAuthed(true);
      loadOrders();
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  const handleLogout = () => {
    document.cookie = "fomo_admin=; path=/; max-age=0";
    setAuthed(false);
    setOrders([]);
  };

  const updateStatus = async (orderId: string, status: string) => {
    await fetch("/api/admin/update-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status }),
    });
    setOrders((prev) =>
      prev.map((o) =>
        o.orderId === orderId ? { ...o, orderStatus: status as Order["orderStatus"] } : o
      )
    );
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <p className="font-serif text-3xl text-purple-400 font-bold">FOMO</p>
            <p className="text-sm text-slate-500 mt-1">Admin Dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-300"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full bg-purple-400 hover:bg-purple-500 text-white rounded-full py-2.5 font-semibold transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingCount = orders.filter((o) => o.orderStatus === "pending").length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <p className="font-serif text-xl text-purple-400 font-bold">FOMO Admin</p>
          <p className="text-xs text-slate-400">Order Management</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{orders.length}</p>
              <p className="text-sm text-slate-500">Total Orders</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{pendingCount}</p>
              <p className="text-sm text-slate-500">Pending Orders</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{formatPrice(totalRevenue)}</p>
              <p className="text-sm text-slate-500">Total Revenue</p>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-serif text-xl text-slate-800">All Orders</h2>
          </div>

          {loading ? (
            <div className="py-16 text-center text-slate-400">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="py-16 text-center">
              <div className="text-5xl mb-3">📦</div>
              <p className="text-slate-500">No orders yet. Share the store link!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-4 py-3 text-slate-600 font-medium">Order ID</th>
                    <th className="text-left px-4 py-3 text-slate-600 font-medium">Customer</th>
                    <th className="text-left px-4 py-3 text-slate-600 font-medium">Items</th>
                    <th className="text-left px-4 py-3 text-slate-600 font-medium">Total</th>
                    <th className="text-left px-4 py-3 text-slate-600 font-medium">Status</th>
                    <th className="text-left px-4 py-3 text-slate-600 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {orders
                    .slice()
                    .reverse()
                    .map((order) => (
                      <tr key={order.orderId} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-4">
                          <span className="font-mono text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                            {order.orderId}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <p className="font-medium text-slate-800">{order.customerName}</p>
                          <p className="text-slate-400 text-xs">{order.phone}</p>
                          <p className="text-slate-400 text-xs">{order.address?.city}, {order.address?.state}</p>
                        </td>
                        <td className="px-4 py-4">
                          <div className="space-y-0.5 max-w-[200px]">
                            {order.items?.map((item, i) => (
                              <p key={i} className="text-slate-600 text-xs line-clamp-1">
                                {item.name} x{item.quantity}
                              </p>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-4 font-semibold text-slate-800">
                          {formatPrice(order.total)}
                        </td>
                        <td className="px-4 py-4">
                          <select
                            value={order.orderStatus}
                            onChange={(e) => updateStatus(order.orderId, e.target.value)}
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-300 ${STATUS_COLORS[order.orderStatus]}`}
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s} className="bg-white text-slate-700">
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-4 text-slate-400 text-xs">
                          {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
