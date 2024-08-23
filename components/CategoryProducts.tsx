"use client";

import React, { useState, useEffect } from "react";

import ProductGrid from "@/components/ProductsGrid";
import { ProductsSort } from "@/components/ProductsSort";
import { BillboardBanner } from "./BillboardBanner";
import { PaginationWithLinks } from "./Pagination-with-links";
import { useSearchParams } from "next/navigation";
import { CategoryPageWithProducts, ProductsWithCategoryAndUser } from "@/types";
import { CategoryFilterPanel } from "./CategoryFilterPanel";

interface Props {
  Category: CategoryPageWithProducts;
  Products: ProductsWithCategoryAndUser[];
}

export const CategoryProductsPage = ({ Category, Products }: Props) => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = Math.max(parseInt(searchParams.get("pageSize") || "8"), 1);

  const count = Products.length;

  const indexOfLastPost = page * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;

  const [currentProducts, setCurrentProducts] = useState(
    Products.slice(indexOfFirstPost, indexOfLastPost)
  );

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("recent");

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSortOption("recent");
  };

  useEffect(() => {
    let filteredProducts = Products;

    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts?.filter((product) =>
        selectedCategories.includes(product.categoryId)
      );
    }

    if (selectedSizes.length > 0) {
      filteredProducts = filteredProducts?.filter((product) =>
        product.variants.some((size) => selectedSizes.includes(size.size.value))
      );
    }

    if (selectedColors.length > 0) {
      filteredProducts = filteredProducts?.filter((product) =>
        product.variants.some((color) =>
          selectedColors.includes(color.color.value)
        )
      );
    }

    if (sortOption) {
      switch (sortOption) {
        case "price-low-high":
          filteredProducts?.sort(
            (a, b) => a.price.toNumber() - b.price.toNumber()
          );
          break;
        case "price-high-low":
          filteredProducts?.sort(
            (a, b) => b.price.toNumber() - a.price.toNumber()
          );
          break;
        case "name-a-z":
          filteredProducts?.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name-z-a":
          filteredProducts?.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          filteredProducts?.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
      }
    }
    setCurrentProducts(
      filteredProducts?.slice(indexOfFirstPost, indexOfLastPost)
    );
  }, [
    selectedCategories,
    Products,
    selectedSizes,
    selectedColors,
    sortOption,
    page,
    Category?.products,
    indexOfFirstPost,
    indexOfLastPost,
  ]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handleSizeChange = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  return (
    <>
      {Category?.billboard?.imageUrl !== undefined && (
        <BillboardBanner data={Category.billboard!} />
      )}
      <div className="md:container grid md:grid-cols-[100px_1fr] min-h-[100dvh] py-4 gap-4 relative">
        <CategoryFilterPanel
          products={Products}
          Category={Category}
          selectedCategories={selectedCategories}
          selectedSizes={selectedSizes}
          selectedColors={selectedColors}
          handleCategoryChange={handleCategoryChange}
          handleSizeChange={handleSizeChange}
          handleColorChange={handleColorChange}
        />
        <div className="h-full flex flex-col justify-between items-center md:items-start mb-8 md:container">
          <div className="space-y-8 w-full">
            <ProductsSort
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
            <ProductGrid
              products={currentProducts}
              onClearFilters={clearAllFilters}
            />
          </div>
          <PaginationWithLinks
            totalCount={count!}
            pageSize={pageSize}
            page={page}
          />
        </div>
      </div>
    </>
  );
};
