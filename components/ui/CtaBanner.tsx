"use client";

import Link from "next/link";
import { MessageCircle, ShoppingBag, Instagram } from "lucide-react";
import { motion } from "framer-motion";

export function CtaBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-16 bg-linear-to-br from-purple-500 via-violet-500 to-pink-500 relative overflow-hidden"
    >
      {/* decorative circles */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-3">
          We&apos;re here to help
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4 leading-tight">
          Need help picking the perfect gift?
        </h2>
        <p className="text-white/80 text-base sm:text-lg mb-8 max-w-xl mx-auto">
          Chat with us on WhatsApp — tell us who it&apos;s for, the occasion, and your budget,
          and we&apos;ll find something they&apos;ll love. 🎁
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="https://wa.me/918882159187?text=Hi!%20I%20need%20help%20picking%20a%20gift"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-purple-600 hover:bg-purple-50 rounded-full px-7 py-3.5 text-sm font-semibold shadow-lg transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/30 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Browse All Gifts
          </Link>

          <a
            href="https://www.instagram.com/fomo_gifting/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white rounded-full px-4 py-3.5 text-sm font-semibold transition-colors"
          >
            <Instagram className="w-4 h-4" />
            @fomo_gifting
          </a>
        </div>
      </div>
    </motion.section>
  );
}
