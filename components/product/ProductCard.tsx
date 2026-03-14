"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { categoryConfig } from "@/lib/categoryConfig";
import { formatPrice } from "@/lib/utils";

const colorMap: Record<string, string> = {
  pink: "bg-pink-400 hover:bg-pink-500",
  blue: "bg-blue-400 hover:bg-blue-500",
  sky: "bg-sky-400 hover:bg-sky-500",
  yellow: "bg-yellow-400 hover:bg-yellow-500",
  rose: "bg-rose-400 hover:bg-rose-500",
  purple: "bg-purple-400 hover:bg-purple-500",
};

const textColorMap: Record<string, string> = {
  pink: "text-pink-600",
  blue: "text-blue-600",
  sky: "text-sky-600",
  yellow: "text-yellow-600",
  rose: "text-rose-600",
  purple: "text-purple-600",
};

const bgColorMap: Record<string, string> = {
  pink: "bg-pink-50 text-pink-700",
  blue: "bg-blue-50 text-blue-700",
  sky: "bg-sky-50 text-sky-700",
  yellow: "bg-yellow-50 text-yellow-700",
  rose: "bg-rose-50 text-rose-700",
  purple: "bg-purple-50 text-purple-700",
};

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();
  const config = categoryConfig[product.category] || categoryConfig.general;
  const btnColor = colorMap[config.color] || colorMap.purple;
  const textColor = textColorMap[config.color] || textColorMap.purple;
  const badgeColor = bgColorMap[config.color] || bgColorMap.purple;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      category: product.category,
    });
    openCart();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -2 }}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
    >
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {/* Category dot */}
          <div
            className={`absolute top-2 left-2 w-2.5 h-2.5 rounded-full ${btnColor}`}
          />
          {/* Popular badge */}
          {product.isPopular && (
            <div
              className={`absolute top-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeColor}`}
            >
              ⭐ Popular
            </div>
          )}
          {/* Add to cart - hover reveal */}
          <motion.button
            onClick={handleAddToCart}
            whileTap={{ scale: 0.95 }}
            className={`absolute bottom-0 left-0 right-0 ${btnColor} text-white py-2.5 text-sm font-semibold flex items-center justify-center gap-1.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Cart
          </motion.button>
        </div>

        {/* Info */}
        <div className="p-3">
          <p
            className={`text-[10px] font-semibold uppercase tracking-widest mb-1 ${textColor}`}
          >
            {config.label}
          </p>
          <h3 className="font-serif text-sm font-semibold text-slate-800 line-clamp-2 leading-snug mb-2">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-slate-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
