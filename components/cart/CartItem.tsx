"use client";

import Image from "next/image";
import { X, Plus, Minus } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { categoryConfig } from "@/lib/categoryConfig";
import { formatPrice } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
}

export function CartItemCard({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const config = categoryConfig[item.category] || categoryConfig.general;

  return (
    <div className="flex gap-3 py-4">
      <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-slate-100">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <span
              className="inline-block text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full mb-1"
              style={{ background: `rgba(var(--${config.color}-100), 0.5)` }}
            >
              {config.label}
            </span>
            <p className="font-medium text-sm text-slate-800 line-clamp-2 leading-snug">
              {item.name}
            </p>
            <p className="text-sm font-semibold text-slate-900 mt-1">
              {formatPrice(item.price)}
            </p>
            {item.giftWrapping && (
              <p className="text-[11px] text-rose-500 mt-0.5">
                + Gift wrapping (₹49)
              </p>
            )}
            {item.giftMessage && (
              <p className="text-[11px] text-slate-500 italic mt-0.5 line-clamp-1">
                "{item.giftMessage}"
              </p>
            )}
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="p-1 rounded-full hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Remove item"
          >
            <X className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
          >
            <Minus className="w-3 h-3 text-slate-600" />
          </button>
          <span className="text-sm font-medium w-5 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
          >
            <Plus className="w-3 h-3 text-slate-600" />
          </button>
          <span className="ml-auto text-sm font-semibold text-slate-800">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
