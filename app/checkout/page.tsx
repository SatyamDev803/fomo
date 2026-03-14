"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { generateOrderId } from "@/lib/utils";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="text-6xl">🛍️</div>
        <h1 className="font-serif text-2xl text-slate-700">Your cart is empty</h1>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-purple-400 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-500 transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          Start Shopping
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async (formData: {
    fullName: string;
    phone: string;
    email: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    pinCode: string;
  }) => {
    setIsProcessing(true);
    const orderId = generateOrderId();
    const total = getTotal();

    try {
      // Try Razorpay if configured
      const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      const isRazorpayConfigured =
        razorpayKeyId && razorpayKeyId !== "placeholder_add_later";

      if (isRazorpayConfigured) {
        const orderRes = await fetch("/api/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: total, orderId }),
        });
        const orderData = await orderRes.json();

        if (orderData.id) {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          document.body.appendChild(script);

          script.onerror = () => setIsProcessing(false);

          script.onload = () => {
            const options = {
              key: razorpayKeyId,
              amount: orderData.amount,
              currency: "INR",
              name: "FOMO Gifting",
              description: "Gift Purchase",
              order_id: orderData.id,
              handler: async (response: {
                razorpay_order_id: string;
                razorpay_payment_id: string;
                razorpay_signature: string;
              }) => {
                await fetch("/api/send-order-email", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    orderId,
                    customer: formData,
                    items,
                    total,
                    paymentId: response.razorpay_payment_id,
                  }),
                });
                clearCart();
                router.push(`/order-success/${orderId}`);
              },
              modal: {
                ondismiss: () => setIsProcessing(false),
              },
              prefill: {
                name: formData.fullName,
                email: formData.email,
                contact: formData.phone,
              },
              theme: { color: "#c084fc" },
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const rzp = new (window as any).Razorpay(options);
            rzp.on("payment.failed", () => setIsProcessing(false));
            rzp.open();
            setIsProcessing(false);
          };
          return;
        }
      }

      // Fallback: place order without payment
      await fetch("/api/send-order-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          customer: formData,
          items,
          total,
          paymentId: null,
        }),
      });
      clearCart();
      router.push(`/order-success/${orderId}`);
    } catch (err) {
      console.error("Order error:", err);
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-serif text-3xl text-slate-800 mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        <CheckoutForm onSubmit={handlePlaceOrder} isProcessing={isProcessing} />
        <OrderSummary />
      </div>
    </div>
  );
}
