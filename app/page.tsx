import { HeroSection } from "@/components/home/HeroSection";
import { CategoryCards } from "@/components/home/CategoryCards";
import { PopularProducts } from "@/components/home/PopularProducts";
import { BudgetSection } from "@/components/home/BudgetSection";
import { InstagramCTA } from "@/components/home/InstagramCTA";
import { CtaBanner } from "@/components/ui/CtaBanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryCards />
      <PopularProducts />
      <BudgetSection />
      <InstagramCTA />
      <CtaBanner />
    </>
  );
}
