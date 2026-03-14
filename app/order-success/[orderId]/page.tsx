"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, MessageCircle } from "lucide-react";

export default function OrderSuccessPage() {
  const params = useParams();
  const orderId = params.orderId as string;

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);
  const deliveryStr = deliveryDate.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex justify-center mb-6"
        >
          <CheckCircle className="w-24 h-24 text-green-500" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h1 className="font-serif text-4xl sm:text-5xl text-slate-800">
            Order Placed! 🎉
          </h1>
          <p className="text-slate-500 text-lg">
            Your gift is on its way to spread some love!
          </p>

          <div className="bg-purple-50 rounded-2xl p-5 text-left space-y-2 my-6">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Order ID</span>
              <span className="font-mono font-semibold text-slate-800">{orderId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Estimated Delivery</span>
              <span className="font-medium text-slate-800">{deliveryStr}</span>
            </div>
          </div>

          <p className="text-sm text-slate-500 flex items-center justify-center gap-1">
            <MessageCircle className="w-4 h-4 text-green-500" />
            We'll WhatsApp you the tracking details shortly
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center bg-purple-400 hover:bg-purple-500 text-white rounded-full h-11 font-semibold transition-colors text-sm"
            >
              Continue Shopping
            </Link>
            <Link
              href="/contact"
              className="flex-1 inline-flex items-center justify-center rounded-full h-11 border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold transition-colors text-sm"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
