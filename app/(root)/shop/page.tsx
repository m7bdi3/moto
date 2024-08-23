import { ProductsPage } from "@/components/ProductsPage";
import { Suspense } from "react";
import { Loading } from "../favorites/page";

export default async function ShopPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductsPage />;
    </Suspense>
  );
}
