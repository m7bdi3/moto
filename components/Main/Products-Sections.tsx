"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/hooks/store/use-store";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductsWithCategoryAndUser } from "@/types";

const itemVariants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
      duration: 1,
    },
  },
};

const itemVariants2 = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
      duration: 1,
    },
  },
};

export const ProductsSections = () => {
  const { products, Categories } = useStore();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const featuredProducts = useMemo(() => {
    if (!products) return [];
    return products
      .filter((product) => product.isFeatured)
      .sort(() => 0.5 - Math.random())
      .slice(0, 8);
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return featuredProducts;
    return featuredProducts.filter(
      (product) => product.category.parentId === selectedCategory
    );
  }, [featuredProducts, selectedCategory]);

  useEffect(() => {
    if (products && Categories) {
      setIsLoading(false);
    }
  }, [products, Categories]);

  return (
    <section className="w-full bg-muted py-16 md:py-24 overflow-hidden">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            variants={itemVariants}
          >
            Featured Products
          </motion.h2>
          <motion.p
            className="max-w-[900px] text-muted-foreground md:text-xl/relaxed"
            variants={itemVariants2}
          >
            Discover our curated selection of the best products for your needs.
          </motion.p>
        </motion.div>

        <Tabs
          defaultValue="all"
          className="mt-12"
          onValueChange={(value) => setSelectedCategory(value)}
        >
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
          <AnimatePresence mode="popLayout">
            {!isLoading && (
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value={selectedCategory} className="mt-6">
                  <ProductGrid products={filteredProducts} />
                </TabsContent>
              </motion.div>
            )}
          </AnimatePresence>
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
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center md:place-items-stretch">
    {products.map((product) => (
      <motion.div key={product.id} variants={itemVariants} layout>
        <ProductCard product={product} />
      </motion.div>
    ))}
  </div>
);
