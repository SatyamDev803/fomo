"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    slug: "her",
    label: "For Her",
    emoji: "🌸",
    description: "Elegant gifts she'll adore",
    gradient: "from-pink-50 to-pink-100",
    hover: "hover:border-pink-300",
    text: "text-pink-600",
    link: "/her",
  },
  {
    slug: "him",
    label: "For Him",
    emoji: "👔",
    description: "Cool gifts he'll actually use",
    gradient: "from-blue-50 to-blue-100",
    hover: "hover:border-blue-300",
    text: "text-blue-600",
    link: "/him",
  },
  {
    slug: "family",
    label: "For Family",
    emoji: "👨‍👩‍👧",
    description: "Cherish every moment together",
    gradient: "from-sky-50 to-sky-100",
    hover: "hover:border-sky-300",
    text: "text-sky-600",
    link: "/family",
  },
  {
    slug: "kids",
    label: "For Kids",
    emoji: "🧸",
    description: "Gifts that spark joy and wonder",
    gradient: "from-yellow-50 to-yellow-100",
    hover: "hover:border-yellow-300",
    text: "text-yellow-600",
    link: "/kids",
  },
  {
    slug: "handmade",
    label: "Handmade",
    emoji: "🤝",
    description: "Crafted with love and care",
    gradient: "from-rose-50 to-rose-100",
    hover: "hover:border-rose-300",
    text: "text-rose-600",
    link: "/handmade",
  },
  {
    slug: "general",
    label: "All Gifts",
    emoji: "🎁",
    description: "Something for everyone",
    gradient: "from-purple-50 to-purple-100",
    hover: "hover:border-purple-300",
    text: "text-purple-600",
    link: "/shop",
  },
];

export function CategoryCards() {
  return (
    <section id="categories" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl text-slate-800 mb-2">
            Shop by Recipient
          </h2>
          <p className="text-slate-500">Find the perfect gift for everyone you love</p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                href={cat.link}
                className={`flex flex-col items-center gap-3 p-4 sm:p-6 rounded-2xl bg-gradient-to-br ${cat.gradient} border border-transparent ${cat.hover} transition-all duration-300 hover:shadow-lg group`}
              >
                <span className="text-4xl sm:text-5xl">{cat.emoji}</span>
                <div className="text-center">
                  <p className={`font-serif font-semibold text-sm sm:text-base ${cat.text}`}>
                    {cat.label}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
                    {cat.description}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold ${cat.text} flex items-center gap-0.5 group-hover:gap-1.5 transition-all`}
                >
                  Shop <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
