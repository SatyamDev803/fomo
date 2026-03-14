"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Plus, Minus, ShoppingBag, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { categoryConfig } from "@/lib/categoryConfig";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { ProductCard } from "@/components/product/ProductCard";
import { CtaBanner } from "@/components/ui/CtaBanner";

const colorBtnMap: Record<string, string> = {
  pink: "bg-pink-400 hover:bg-pink-500 shadow-pink-200",
  blue: "bg-blue-400 hover:bg-blue-500 shadow-blue-200",
  sky: "bg-sky-400 hover:bg-sky-500 shadow-sky-200",
  yellow: "bg-yellow-400 hover:bg-yellow-500 shadow-yellow-200",
  rose: "bg-rose-400 hover:bg-rose-500 shadow-rose-200",
  purple: "bg-purple-400 hover:bg-purple-500 shadow-purple-200",
};

const outlineMap: Record<string, string> = {
  pink: "border-pink-400 text-pink-500 hover:bg-pink-50",
  blue: "border-blue-400 text-blue-500 hover:bg-blue-50",
  sky: "border-sky-400 text-sky-500 hover:bg-sky-50",
  yellow: "border-yellow-400 text-yellow-500 hover:bg-yellow-50",
  rose: "border-rose-400 text-rose-500 hover:bg-rose-50",
  purple: "border-purple-400 text-purple-500 hover:bg-purple-50",
};

const badgeMap: Record<string, string> = {
  pink: "bg-pink-50 text-pink-700",
  blue: "bg-blue-50 text-blue-700",
  sky: "bg-sky-50 text-sky-700",
  yellow: "bg-yellow-50 text-yellow-700",
  rose: "bg-rose-50 text-rose-700",
  purple: "bg-purple-50 text-purple-700",
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  const [quantity, setQuantity] = useState(1);
  const [giftMessage, setGiftMessage] = useState("");
  const [giftWrapping, setGiftWrapping] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const { addItem, openCart } = useCartStore();

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="text-6xl">😕</div>
        <h1 className="font-serif text-2xl text-slate-700">Product not found</h1>
        <Link href="/shop" className="text-purple-500 hover:underline">
          Browse all gifts
        </Link>
      </div>
    );
  }

  const config = categoryConfig[product.category] || categoryConfig.general;
  const btnColor = colorBtnMap[config.color] || colorBtnMap.purple;
  const outline = outlineMap[config.color] || outlineMap.purple;
  const badge = badgeMap[config.color] || badgeMap.purple;
  const related = getRelatedProducts(product);

  const totalPrice = product.price * quantity + (giftWrapping ? 49 * quantity : 0);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0],
      category: product.category,
      giftMessage: giftMessage || undefined,
      giftWrapping,
    });
    openCart();
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = "/checkout";
  };

  return (
    <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-700">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/${product.category}`} className="hover:text-slate-700 capitalize">
          {config.label}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-700 truncate max-w-[180px]">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div className="space-y-3">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100"
          >
            <Image
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? "border-purple-400" : "border-slate-200"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div>
            <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${badge}`}>
              {config.emoji} {config.label}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-slate-800 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-slate-900">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-lg text-slate-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
            {product.originalPrice && (
              <span className="text-sm text-green-600 font-semibold">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
              </span>
            )}
          </div>

          <p className="text-slate-600 leading-relaxed">{product.description}</p>

          <Separator />

          {/* Gift message */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Add a personal message 💌 <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <textarea
              value={giftMessage}
              onChange={(e) => setGiftMessage(e.target.value)}
              placeholder="Write a heartfelt message for the recipient..."
              className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 resize-none focus:outline-none focus:ring-1 focus:ring-purple-300 text-slate-700 placeholder:text-slate-400"
              rows={3}
            />
          </div>

          {/* Gift wrapping */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={giftWrapping}
              onChange={(e) => setGiftWrapping(e.target.checked)}
              className="w-4 h-4 rounded accent-purple-400"
            />
            <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
              Add gift wrapping <span className="text-slate-400">(+₹49)</span> 🎀
            </span>
          </label>

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-700">Quantity</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
              >
                <Minus className="w-3.5 h-3.5 text-slate-600" />
              </button>
              <span className="w-8 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-slate-600" />
              </button>
            </div>
            {giftWrapping && (
              <span className="text-sm text-slate-500 ml-auto">
                Total: <span className="font-semibold text-slate-800">{formatPrice(totalPrice)}</span>
              </span>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <motion.div className="flex-1" whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleAddToCart}
                className={`w-full h-12 rounded-full text-white font-semibold text-base ${btnColor} shadow-lg`}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </motion.div>
            <Button
              onClick={handleBuyNow}
              variant="outline"
              className={`flex-1 h-12 rounded-full font-semibold text-base border-2 ${outline}`}
            >
              <Zap className="w-4 h-4 mr-2" />
              Buy Now
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 pt-1">
            {["🚚 Free delivery above ₹499", "↩️ Easy returns", "🎁 Beautiful packaging"].map((badge) => (
              <span key={badge} className="text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                {badge}
              </span>
            ))}
          </div>

          <Separator />

          {/* Accordion */}
          <Accordion className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger className="text-sm font-medium">Product Description</AccordionTrigger>
              <AccordionContent className="text-sm text-slate-600">{product.description}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="dimensions">
              <AccordionTrigger className="text-sm font-medium">Dimensions & Weight</AccordionTrigger>
              <AccordionContent className="text-sm text-slate-600">
                Standard packaging dimensions. Exact dimensions may vary by product. Contact us for specific measurements.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="care">
              <AccordionTrigger className="text-sm font-medium">Care Instructions</AccordionTrigger>
              <AccordionContent className="text-sm text-slate-600">
                Handle with care. Keep away from moisture. Store in a cool, dry place when not in use.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-serif text-2xl text-slate-800 mb-6">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>

    <CtaBanner />
    </>
  );
}
