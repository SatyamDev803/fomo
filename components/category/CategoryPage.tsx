"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { ChevronRight } from "lucide-react";
import { Category, Occasion } from "@/types";
import { getProductsByCategory } from "@/lib/products";
import { categoryConfig } from "@/lib/categoryConfig";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CtaBanner } from "@/components/ui/CtaBanner";

interface CategoryPageProps {
  category: Category;
}

const priceOptions = [
  { value: 0, label: "All Prices" },
  { value: 99, label: "Under ₹99" },
  { value: 299, label: "Under ₹299" },
  { value: 499, label: "Under ₹499" },
  { value: 999, label: "Under ₹999" },
  { value: 1999, label: "Under ₹1999" },
];

const occasionOptions = [
  { value: "", label: "All Occasions" },
  { value: "birthday", label: "Birthday" },
  { value: "anniversary", label: "Anniversary" },
  { value: "wedding", label: "Wedding" },
  { value: "congratulations", label: "Congratulations" },
  { value: "justbecause", label: "Just Because" },
];

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const descriptions: Record<string, string> = {
  her: "Thoughtful and beautiful gifts curated especially for the women who make life magical.",
  him: "Practical and stylish gifts that every man will actually love and use.",
  family: "Gifts that bring families together and create lasting memories.",
  kids: "Fun, creative, and safe gifts that kids will absolutely love.",
  handmade: "Unique, artisan-crafted gifts made with love and attention to detail.",
  general: "A curated collection of thoughtful gifts for every occasion.",
};

const gradients: Record<string, string> = {
  her: "from-pink-100 to-pink-50",
  him: "from-blue-100 to-blue-50",
  family: "from-sky-100 to-sky-50",
  kids: "from-yellow-100 to-yellow-50",
  handmade: "from-rose-100 to-rose-50",
  general: "from-purple-100 to-purple-50",
};

const activeChipColors: Record<string, string> = {
  her: "bg-pink-400 text-white border-pink-400",
  him: "bg-blue-400 text-white border-blue-400",
  family: "bg-sky-400 text-white border-sky-400",
  kids: "bg-yellow-400 text-white border-yellow-400",
  handmade: "bg-rose-400 text-white border-rose-400",
  general: "bg-purple-400 text-white border-purple-400",
};

export function CategoryPage({ category }: CategoryPageProps) {
  const config = categoryConfig[category] || categoryConfig.general;
  const allProducts = getProductsByCategory(category);

  const [maxPrice, setMaxPrice] = useState(0);
  const [occasion, setOccasion] = useState<Occasion | "">("");
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc">("popular");

  const filtered = useMemo(() => {
    let result = [...allProducts];
    if (maxPrice > 0) result = result.filter((p) => p.price <= maxPrice);
    if (occasion) result = result.filter((p) => p.occasion.includes(occasion as Occasion));
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    return result;
  }, [allProducts, maxPrice, occasion, sortBy]);

  const activeChip = activeChipColors[category] || activeChipColors.general;
  const gradient = gradients[category] || gradients.general;

  return (
    <div>
      {/* Hero banner */}
      <div className={`bg-gradient-to-br ${gradient} py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
            <Link href="/" className="hover:text-slate-700">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-700 font-medium">{config.label}</span>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <span className="text-6xl">{config.emoji}</span>
            <h1 className="font-serif text-4xl sm:text-5xl text-slate-800">
              {config.label}
            </h1>
            <p className="text-lg text-slate-600 max-w-xl">
              {descriptions[category] || descriptions.general}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {priceOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setMaxPrice(opt.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                maxPrice === opt.value ? activeChip : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {occasionOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setOccasion(opt.value as Occasion | "")}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                occasion === opt.value ? activeChip : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-500">{filtered.length} products</p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 bg-white focus:outline-none focus:ring-1 focus:ring-purple-300"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <ProductGrid products={filtered} />
      </div>

      <CtaBanner />
    </div>
  );
}
