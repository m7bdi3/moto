"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/hooks/store/use-store";

import { FilterPanel } from "@/components/FilterPanel";
import ProductGrid from "@/components/ProductsGrid";
import { ProductsSort } from "@/components/ProductsSort";
import { PaginationWithLinks } from "./Pagination-with-links";

export const ProductsPage = () => {
  const { products } = useStore();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = Math.max(parseInt(searchParams.get("pageSize") || "8"), 1);
  const count = products?.length;

  const indexOfLastPost = page * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;

  const [currentProducts, setCurrentProducts] = useState(
    products?.slice(indexOfFirstPost, indexOfLastPost)
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
    let filteredProducts = products;

    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts?.filter((product) =>
        selectedCategories.some((selectedCategoryId) => {
          const productCategory = product.category.id;
          return productCategory === selectedCategoryId;
        })
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
          filteredProducts?.sort((a, b) => a.price - b.price);
          break;
        case "price-high-low":
          filteredProducts?.sort((a, b) => b.price - a.price);
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
    selectedSizes,
    selectedColors,
    sortOption,
    page,
    products,
    indexOfFirstPost,
    indexOfLastPost,
  ]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
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
      <div className="flex flex-col justify-center items-center md:h-96 h-72 space-y-4 dark:bg-zinc-800 bg-zinc-100">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-center tracking-tighter">
          Our Products
        </h1>
        {/* Description */}
        <p className="text-center text-muted-foreground max-w-[90%] md:max-w-2xl">
          Explore our wide range of high-quality products tailored to meet your
          every need. Whether you&apos;re looking for the latest trends or
          classic essentials, we have something for everyone.
        </p>
      </div>
      <div className="container grid md:grid-cols-[100px_1fr] lg:grid-cols-[160px_1fr] min-h-[100dvh] py-4 relative">
        <FilterPanel
          selectedCategories={selectedCategories}
          selectedSizes={selectedSizes}
          selectedColors={selectedColors}
          handleCategoryChange={handleCategoryChange}
          handleSizeChange={handleSizeChange}
          handleColorChange={handleColorChange}
        />
        <div className="h-full flex flex-col justify-between items-center md:items-start mb-8 ">
          <div className=" md:self-start w-full space-y-8 pl-2">
            <ProductsSort
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
            <ProductGrid
              products={currentProducts!}
              onClearFilters={clearAllFilters}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto w-full mb-4">
        <PaginationWithLinks
          page={page}
          totalCount={count!}
          pageSize={pageSize}
        />
      </div>
    </>
  );
};
