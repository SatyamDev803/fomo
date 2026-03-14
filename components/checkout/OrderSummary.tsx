"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { Truck } from "lucide-react";

export function OrderSummary() {
  const { items, getSubtotal, getGiftWrappingTotal, getDeliveryCharge, getTotal } = useCartStore();
  const subtotal = getSubtotal();
  const giftWrapping = getGiftWrappingTotal();
  const delivery = getDeliveryCharge();
  const total = getTotal();

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm h-fit sticky top-24">
      <h2 className="font-serif text-xl text-slate-800 mb-4">Order Summary</h2>

      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-100 shrink-0">
              <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 line-clamp-1">{item.name}</p>
              <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
              {item.giftWrapping && <p className="text-xs text-rose-500">+ Gift wrap</p>}
            </div>
            <p className="text-sm font-semibold text-slate-800 shrink-0">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
        </div>
        {giftWrapping > 0 && (
          <div className="flex justify-between text-slate-600">
            <span>Gift wrapping</span><span>{formatPrice(giftWrapping)}</span>
          </div>
        )}
        <div className="flex justify-between text-slate-600">
          <span>Delivery</span>
          <span className={delivery === 0 ? "text-green-600 font-medium" : ""}>
            {delivery === 0 ? "FREE" : formatPrice(delivery)}
          </span>
        </div>
        <Separator />
        <div className="flex justify-between font-bold text-base text-slate-900 pt-1">
          <span>Total</span><span>{formatPrice(total)}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 bg-slate-50 rounded-xl p-3">
        <Truck className="w-4 h-4 text-purple-400 shrink-0" />
        <span>Estimated delivery: <strong>3–5 business days</strong></span>
      </div>
    </div>
  );
}
