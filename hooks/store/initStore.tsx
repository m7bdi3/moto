"use client";

import { useEffect, useRef } from "react";
import { useStore, storeState } from "./use-store";

export default function InitStore({
  Categories,
  Category,
  products,
  Product,
  sizes,
  colors,
}: storeState) {
  const initState = useRef(false);

  useEffect(() => {
    if (!initState.current) {
      useStore.setState({
        Categories,
        Category,
        products,
        Product,
        sizes,
        colors,
      });
      initState.current = true;
    }
  }, [Categories, Category, products, Product, sizes, colors]);

  return null;
}
