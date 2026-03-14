"use client";

import { useState } from "react";
import { Mail, Phone, Instagram, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSent(true);
    } catch {
      setError("Something went wrong. Please try emailing us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl sm:text-5xl text-slate-800 mb-3">
          Get in Touch 💌
        </h1>
        <p className="text-lg text-slate-500">
          We&apos;d love to hear from you. Reach out via any channel below!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
        <a
          href="mailto:forourmomentsfomo@gmail.com"
          className="flex flex-col items-center gap-3 p-6 bg-purple-50 rounded-2xl hover:bg-purple-100 transition-colors group"
        >
          <div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-slate-800 mb-0.5">Email Us</p>
            <p className="text-sm text-purple-600 group-hover:underline break-all">
              forourmomentsfomo@gmail.com
            </p>
          </div>
        </a>

        <a
          href="https://wa.me/918882159187?text=Hi!%20I%20need%20help%20with%20gifting"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-3 p-6 bg-green-50 rounded-2xl hover:bg-green-100 transition-colors group"
        >
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-slate-800 mb-0.5">Call / WhatsApp</p>
            <p className="text-sm text-green-600 group-hover:underline">8882159187</p>
            <p className="text-xs text-slate-400 mt-0.5">Also on WhatsApp</p>
          </div>
        </a>

        <a
          href="https://www.instagram.com/fomo_gifting/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-3 p-6 bg-rose-50 rounded-2xl hover:bg-rose-100 transition-colors group"
        >
          <div className="w-12 h-12 bg-linear-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
            <Instagram className="w-5 h-5 text-white" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-slate-800 mb-0.5">Instagram</p>
            <p className="text-sm text-rose-500 group-hover:underline">@fomo_gifting</p>
          </div>
        </a>
      </div>

      {/* Contact form */}
      <div className="bg-slate-50 rounded-2xl p-6 sm:p-8">
        <h2 className="font-serif text-2xl text-slate-800 mb-6">Send us a message</h2>

        {sent ? (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <CheckCircle className="w-12 h-12 text-green-500" />
            <p className="text-lg font-semibold text-slate-800">Message sent!</p>
            <p className="text-slate-500 text-sm">We&apos;ll get back to you soon.</p>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-300"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea
                rows={5}
                required
                placeholder="How can we help you?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-purple-300"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              type="submit"
              disabled={loading}
              className="bg-purple-400 hover:bg-purple-500 text-white rounded-full px-8 h-11"
            >
              <Send className="w-4 h-4 mr-2" />
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
