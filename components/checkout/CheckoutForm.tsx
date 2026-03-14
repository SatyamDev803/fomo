"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock, Loader2 } from "lucide-react";

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu & Kashmir",
  "Ladakh","Puducherry","Chandigarh",
];

interface CheckoutFormProps {
  onSubmit: (data: {
    fullName: string;
    phone: string;
    email: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    pinCode: string;
  }) => Promise<void>;
  isProcessing: boolean;
}

const inputCls =
  "w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-300 text-slate-700 placeholder:text-slate-400 bg-white";
const labelCls = "block text-sm font-medium text-slate-700 mb-1";

export function CheckoutForm({ onSubmit, isProcessing }: CheckoutFormProps) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  const isRazorpayConfigured =
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID &&
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID !== "placeholder_add_later";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Delivery Details */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-serif text-xl text-slate-800 mb-5">Delivery Details</h2>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Full Name *</label>
            <input required value={form.fullName} onChange={set("fullName")} placeholder="Your full name" className={inputCls} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Phone Number *</label>
              <input required value={form.phone} onChange={set("phone")} placeholder="WhatsApp number" type="tel" pattern="[0-9]{10}" className={inputCls} />
              <p className="text-xs text-slate-400 mt-1">We'll send tracking on this number</p>
            </div>
            <div>
              <label className={labelCls}>Email *</label>
              <input required value={form.email} onChange={set("email")} placeholder="your@email.com" type="email" className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Address Line 1 *</label>
            <input required value={form.address1} onChange={set("address1")} placeholder="House/Flat no., Street, Area" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Address Line 2 <span className="text-slate-400 font-normal">(optional)</span></label>
            <input value={form.address2} onChange={set("address2")} placeholder="Landmark, Colony" className={inputCls} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>City *</label>
              <input required value={form.city} onChange={set("city")} placeholder="City" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>State *</label>
              <select required value={form.state} onChange={set("state")} className={inputCls}>
                <option value="">Select state</option>
                {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>PIN Code *</label>
              <input required value={form.pinCode} onChange={set("pinCode")} placeholder="110001" pattern="[0-9]{6}" maxLength={6} className={inputCls} />
            </div>
          </div>
        </div>
      </div>

      {/* Payment */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h2 className="font-serif text-xl text-slate-800 mb-4">Payment</h2>

        {!isRazorpayConfigured && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
            <p className="text-sm text-amber-700">
              ⚠️ Payment gateway not configured — your order will be placed and we'll contact you for payment.
            </p>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-slate-500 mb-5">
          <Lock className="w-4 h-4 text-green-500" />
          <span>Secured by Razorpay | UPI • Cards • Net Banking • Wallets</span>
        </div>

        <Button
          type="submit"
          disabled={isProcessing}
          className="w-full h-13 bg-purple-400 hover:bg-purple-500 text-white rounded-full text-base font-semibold shadow-lg shadow-purple-100"
        >
          {isProcessing ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</>
          ) : (
            <><Lock className="w-4 h-4 mr-2" /> Place Order</>
          )}
        </Button>
      </div>
    </form>
  );
}
