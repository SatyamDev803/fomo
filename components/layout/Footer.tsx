import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";
import { FomoLogo } from "@/components/ui/FomoLogo";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "For Her", href: "/her" },
  { label: "For Him", href: "/him" },
  { label: "For Family", href: "/family" },
  { label: "For Kids", href: "/kids" },
  { label: "Handmade", href: "/handmade" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <FomoLogo className="text-2xl" />
              <p className="text-[10px] text-slate-500 font-medium tracking-widest uppercase">
                gifting
              </p>
            </div>
            <p className="text-sm leading-relaxed">
              Gift the Moment. Gift the Feeling.
              <br />
              Handpicked gifts for every person, every occasion, every budget.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/fomo_gifting/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-800 hover:bg-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:forourmomentsfomo@gmail.com"
                className="p-2 rounded-full bg-slate-800 hover:bg-purple-500 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="tel:8882159187"
                className="p-2 rounded-full bg-slate-800 hover:bg-green-500 transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-purple-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <a
                  href="mailto:forourmomentsfomo@gmail.com"
                  className="hover:text-purple-400 transition-colors break-all"
                >
                  forourmomentsfomo@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                <a
                  href="tel:8882159187"
                  className="hover:text-purple-400 transition-colors"
                >
                  8882159187
                </a>
                <span className="text-xs text-slate-500">(WhatsApp)</span>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-purple-400 shrink-0" />
                <a
                  href="https://www.instagram.com/fomo_gifting/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-400 transition-colors"
                >
                  @fomo_gifting
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-sm text-slate-500">
          © 2025 FOMO Gifting. Made with 💜 in India
        </div>
      </div>
    </footer>
  );
}
