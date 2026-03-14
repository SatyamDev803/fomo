import { Instagram } from "lucide-react";

export function InstagramCTA() {
  return (
    <section className="py-12 bg-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-slate-800 mb-1">
              @fomo_gifting on Instagram
            </h2>
            <p className="text-slate-600">
              Follow us for gifting inspo, new arrivals and behind-the-scenes 🎁
            </p>
          </div>
          <a
            href="https://www.instagram.com/fomo_gifting/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-rose-400 text-rose-500 hover:bg-rose-400 hover:text-white rounded-full px-8 py-3 text-sm font-semibold shrink-0 transition-colors"
          >
            <Instagram className="w-4 h-4" />
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
