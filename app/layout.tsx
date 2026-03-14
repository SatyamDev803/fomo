import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WhatsAppBubbleWrapper } from "@/components/ui/WhatsAppBubbleWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "FOMO Gifting | Gift the Moment",
  description:
    "Handpicked gifts for every person, every occasion, every budget. Shop beautiful gifts for her, him, family, kids and more.",
  keywords: ["gifts", "gifting", "birthday gifts", "anniversary gifts", "India", "FOMO Gifting"],
  openGraph: {
    title: "FOMO Gifting | Gift the Moment",
    description: "Handpicked gifts for every person, every occasion, every budget.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className="min-h-screen bg-white text-slate-800 antialiased">
        <Navbar />
        <main className="pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileNav />
        <CartDrawer />
        <WhatsAppBubbleWrapper />
      </body>
    </html>
  );
}
