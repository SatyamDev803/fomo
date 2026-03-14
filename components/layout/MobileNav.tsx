"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, ShoppingBag, Phone } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Home", href: "/", icon: Home },
  { label: "Categories", href: "/shop", icon: Grid3X3 },
  { label: "Cart", href: "#cart", icon: ShoppingBag, isCart: true },
  { label: "Contact", href: "/contact", icon: Phone },
];

export function MobileNav() {
  const pathname = usePathname();
  const { getItemCount, openCart } = useCartStore();
  const itemCount = getItemCount();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-slate-200 safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = !tab.isCart && pathname === tab.href;

          if (tab.isCart) {
            return (
              <button
                key={tab.label}
                onClick={openCart}
                className="flex flex-col items-center gap-0.5 px-4 py-1 min-w-[44px] min-h-[44px] justify-center relative"
              >
                <div className="relative">
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-colors",
                      "text-slate-500"
                    )}
                  />
                  {itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-purple-400 text-white text-[9px] font-bold rounded-full min-w-[14px] min-h-[14px] flex items-center justify-center px-0.5">
                      {itemCount > 9 ? "9+" : itemCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-500">{tab.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center gap-0.5 px-4 py-1 min-w-[44px] min-h-[44px] justify-center"
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-purple-500" : "text-slate-500"
                )}
              />
              <span
                className={cn(
                  "text-[10px] transition-colors",
                  isActive ? "text-purple-500 font-medium" : "text-slate-500"
                )}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
