import CommingSoon from "@/components/Main/Coming-Soon";
import { Hero } from "@/components/Main/Hero";
import { ProductsSections } from "@/components/Main/Products-Sections";
import RecentlyAdded from "@/components/Main/Recently-Added";
import { References } from "@/components/Main/References";
import { Loading } from "./favorites/page";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Hero />
      <RecentlyAdded />
      <ProductsSections />
      <CommingSoon />
      <References />
    </Suspense>
  );
}
