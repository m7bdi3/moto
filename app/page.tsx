import CommingSoon from "@/components/Main/Coming-Soon";
import { Hero } from "@/components/Main/Hero";
import { ProductsSections } from "@/components/Main/Products-Sections";
import RecentlyAdded from "@/components/Main/Recently-Added";
import { References } from "@/components/Main/References";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Hero />
      <ProductsSections />
      <RecentlyAdded />
      <ProductsSections />
      <CommingSoon />
      <References />
    </div>
  );
}
