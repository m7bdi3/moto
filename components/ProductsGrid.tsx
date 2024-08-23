import React, { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import { ProductsWithCategoryAndUser } from "@/types";
import { ProductSkeleton } from "./ProductSkeleton";
import { PackageX } from "lucide-react";
import { Button } from "./ui/button";

interface ProductGridProps {
  products: ProductsWithCategoryAndUser[];
  onClearFilters?: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onClearFilters,
}) => (
  <Suspense fallback={<ProductSkeleton />}>
    {products.length > 0 || products === undefined ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 justify-items-center w-full ">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center w-full h-full">
        <PackageX className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No Products Found</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          We couldn&apos;t find any products matching your current filters. Try
          adjusting your search or browse our other categories.
        </p>
        {onClearFilters && (
          <Button onClick={onClearFilters} variant="outline">
            Clear All Filters
          </Button>
        )}
      </div>
    )}
  </Suspense>
);

export default ProductGrid;
