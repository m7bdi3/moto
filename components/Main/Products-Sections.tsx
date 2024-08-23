"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import { useStore } from "@/hooks/store/use-store";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ProductsWithCategoryAndUser } from "@/types";

export const ProductsSections = () => {
  const { products, Categories } = useStore();
  const [featuredProducts, setFeaturedProducts] = useState<
    ProductsWithCategoryAndUser[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    if (products) {
      const featured = products
        .filter((product) => product.isFeatured)
        .sort(() => 0.5 - Math.random())
        .slice(0, 8);
      setFeaturedProducts(featured);
    }
  }, [products]);

  const filteredProducts =
    selectedCategory === "all"
      ? featuredProducts
      : featuredProducts.filter(
          (product) => product.category.parentId === selectedCategory
        );

  return (
    <section className="w-full bg-muted py-16 md:py-24">
      <div className="container px-4 md:px-6 ">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Featured Products
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
            Discover our curated selection of the best products for your needs.
          </p>
        </motion.div>

        <Tabs defaultValue="all" className="mt-12 ">
          <TabsList className="flex justify-center flex-wrap">
            <TabsTrigger value="all">All</TabsTrigger>
            {Categories?.filter((category) => category.parentId === null).map(
              (category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              )
            )}
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <ProductGrid products={filteredProducts} />
          </TabsContent>
          {Categories?.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <ProductGrid
                products={filteredProducts.filter(
                  (p) => p.category.parentId === category.id
                )}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

const ProductGrid = ({
  products,
}: {
  products: ProductsWithCategoryAndUser[];
}) => (
  <motion.div
    className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 place-items-center md:place-items-stretch"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    {products.map((product) => (
      <motion.div
        key={product.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ProductCard product={product} />
      </motion.div>
    ))}
  </motion.div>
);
