"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const heroImages = [
  { src: "https://picsum.photos/seed/hero1/300/380", alt: "Beautiful gift" },
  { src: "https://picsum.photos/seed/hero2/300/380", alt: "Gift box" },
  { src: "https://picsum.photos/seed/hero3/300/380", alt: "Wrapped present" },
  { src: "https://picsum.photos/seed/hero4/300/380", alt: "Gift set" },
];

const floatingEmojis = [
  { emoji: "🎁", className: "top-4 right-4 animate-float" },
  { emoji: "✨", className: "top-1/3 left-4 animate-float-delay-1" },
  { emoji: "💝", className: "bottom-8 right-8 animate-float-delay-2" },
];

const trustBadges = [
  { icon: "🚚", text: "Free delivery above ₹499" },
  { icon: "🎁", text: "Gift wrapping available" },
  { icon: "⭐", text: "500+ happy customers" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function HeroSection() {
  return (
    <section className="min-h-[calc(100vh-64px)] bg-linear-to-br from-purple-50 via-white to-pink-50 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left: Text */}
          <motion.div
            className="flex-[1.5] space-y-6 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1.5 rounded-full">
                ✨ New Collection
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl text-slate-800 leading-tight"
            >
              Gift the Moment.
              <br />
              <span className="text-purple-400">Gift the Feeling.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-slate-500 leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              Handpicked gifts for every person, every occasion, every budget.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              <Link
                href="/shop"
                className="inline-flex items-center gap-1 bg-purple-400 hover:bg-purple-500 text-white rounded-full px-8 py-3.5 text-base font-semibold shadow-lg shadow-purple-200 transition-colors"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#categories"
                className="inline-flex items-center rounded-full px-8 py-3.5 text-base font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Explore Categories
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              {trustBadges.map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-1.5 text-sm text-slate-500"
                >
                  <span>{badge.icon}</span>
                  <span>{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Bento grid */}
          <div className="flex-1 w-full max-w-md lg:max-w-none relative">
            <div className="grid grid-cols-2 gap-3">
              {heroImages.map((img, i) => (
                <motion.div
                  key={img.src}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className={`relative rounded-2xl overflow-hidden shadow-md ${
                    i === 0 ? "aspect-3/4" : i === 3 ? "aspect-3/4" : "aspect-square"
                  } ${i === 1 ? "mt-6" : i === 2 ? "-mt-6" : ""}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 200px"
                  />
                </motion.div>
              ))}
            </div>

            {/* Floating emojis */}
            {floatingEmojis.map(({ emoji, className }) => (
              <div
                key={emoji}
                className={`absolute text-2xl ${className} pointer-events-none select-none`}
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
