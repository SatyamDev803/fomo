"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const budgets = [
  { amount: 99, label: "Under ₹99", emoji: "🎉", gradient: "from-yellow-400 to-yellow-500" },
  { amount: 199, label: "Under ₹199", emoji: "💌", gradient: "from-rose-400 to-rose-500" },
  { amount: 299, label: "Under ₹299", emoji: "🌸", gradient: "from-pink-400 to-pink-500" },
  { amount: 499, label: "Under ₹499", emoji: "✨", gradient: "from-purple-400 to-purple-500" },
  { amount: 999, label: "Under ₹999", emoji: "🎁", gradient: "from-blue-400 to-blue-500" },
  { amount: 1999, label: "Under ₹1999", emoji: "💎", gradient: "from-sky-400 to-sky-500" },
];

export function BudgetSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl text-slate-800 mb-2">
            Find the Perfect Gift for Every Budget
          </h2>
          <p className="text-slate-500">Thoughtful gifts at every price point</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {budgets.map((budget, i) => (
            <motion.div
              key={budget.amount}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ scale: 1.05, rotate: -0.5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={`/shop?maxPrice=${budget.amount}`}
                className={`flex flex-col items-center justify-center gap-2 p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${budget.gradient} text-white hover:shadow-xl transition-shadow`}
              >
                <span className="text-3xl">{budget.emoji}</span>
                <p className="font-serif text-xl sm:text-2xl font-bold">
                  {budget.label}
                </p>
                <p className="text-sm opacity-80 font-medium">Shop →</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
