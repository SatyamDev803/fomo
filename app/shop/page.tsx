"use client";

import { useState, useMemo } from "react";
import { getAllProducts } from "@/lib/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Product, Category, Occasion } from "@/types";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const occasionOptions = [
  { value: "", label: "All Occasions" },
  { value: "birthday", label: "Birthday" },
  { value: "anniversary", label: "Anniversary" },
  { value: "wedding", label: "Wedding" },
  { value: "congratulations", label: "Congratulations" },
  { value: "justbecause", label: "Just Because" },
];

const priceOptions = [
  { value: 0, label: "All Prices" },
  { value: 99, label: "Under ₹99" },
  { value: 299, label: "Under ₹299" },
  { value: 499, label: "Under ₹499" },
  { value: 999, label: "Under ₹999" },
  { value: 1999, label: "Under ₹1999" },
];

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialMaxPrice = Number(searchParams.get("maxPrice")) || 0;

  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [occasion, setOccasion] = useState<Occasion | "">("");
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc">("popular");

  const allProducts = getAllProducts();

  const filtered = useMemo(() => {
    let result = [...allProducts];
    if (maxPrice > 0) result = result.filter((p) => p.price <= maxPrice);
    if (occasion) result = result.filter((p) => p.occasion.includes(occasion as Occasion));
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    return result;
  }, [allProducts, maxPrice, occasion, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="font-serif text-4xl text-slate-800 mb-2">All Gifts</h1>
        <p className="text-slate-500">{filtered.length} gifts found</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {priceOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setMaxPrice(opt.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              maxPrice === opt.value
                ? "bg-purple-400 text-white border-purple-400"
                : "bg-white text-slate-600 border-slate-200 hover:border-purple-300"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {occasionOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setOccasion(opt.value as Occasion | "")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              occasion === opt.value
                ? "bg-purple-400 text-white border-purple-400"
                : "bg-white text-slate-600 border-slate-200 hover:border-purple-300"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="flex justify-end mb-6">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 bg-white focus:outline-none focus:ring-1 focus:ring-purple-300"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <ProductGrid products={filtered} />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-500">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
