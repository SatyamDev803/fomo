"use client";

import Link from "next/link";
import { ShoppingBag, Package } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cartStore";
import { CartItemCard } from "./CartItem";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    getSubtotal,
    getGiftWrappingTotal,
    getDeliveryCharge,
    getTotal,
    getItemCount,
  } = useCartStore();

  const itemCount = getItemCount();
  const subtotal = getSubtotal();
  const giftWrapping = getGiftWrappingTotal();
  const delivery = getDeliveryCharge();
  const total = getTotal();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[420px] p-0 flex flex-col"
      >
        <SheetHeader className="px-5 pt-5 pb-4 border-b border-slate-100">
          <SheetTitle className="flex items-center gap-2 text-lg font-serif">
            <ShoppingBag className="w-5 h-5 text-purple-400" />
            Your Cart 🛍️
            {itemCount > 0 && (
              <span className="ml-auto text-sm font-normal text-slate-500">
                {itemCount} item{itemCount !== 1 ? "s" : ""}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
            <div className="text-6xl">🎁</div>
            <div>
              <p className="font-serif text-xl text-slate-700 mb-1">
                Your cart is empty
              </p>
              <p className="text-sm text-slate-500">
                Start adding gifts for your loved ones!
              </p>
            </div>
            <Link
              href="/shop"
              onClick={closeCart}
              className="inline-flex items-center justify-center bg-purple-400 hover:bg-purple-500 text-white rounded-full px-6 py-2.5 text-sm font-semibold transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5">
              <div className="divide-y divide-slate-100">
                {items.map((item) => (
                  <CartItemCard key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="border-t border-slate-100 px-5 pt-4 pb-6 space-y-3 bg-slate-50/50">
              {subtotal < 499 && (
                <div className="bg-purple-50 border border-purple-100 rounded-xl px-3 py-2 text-center">
                  <p className="text-xs text-purple-700">
                    Add{" "}
                    <span className="font-semibold">
                      {formatPrice(499 - subtotal)}
                    </span>{" "}
                    more for free delivery! 🚚
                  </p>
                </div>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {giftWrapping > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Gift wrapping</span>
                    <span>{formatPrice(giftWrapping)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Delivery</span>
                  <span
                    className={delivery === 0 ? "text-green-600 font-medium" : ""}
                  >
                    {delivery === 0 ? "FREE 🚚" : formatPrice(delivery)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-base text-slate-900">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full inline-flex items-center justify-center bg-purple-400 hover:bg-purple-500 text-white rounded-full h-12 text-base font-semibold transition-colors"
              >
                <Package className="w-4 h-4 mr-2" />
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
