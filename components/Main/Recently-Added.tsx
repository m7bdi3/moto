"use client";

import { useStore } from "@/hooks/store/use-store";
import ProductCard from "../ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useEffect, useState } from "react";
import { ProductsWithCategoryAndUser } from "@/types";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { TransitionLink } from "../LinkTransition";

export default function RecentlyAdded() {
  const { products } = useStore();
  const [recentProducts, setRecentProducts] = useState<
    ProductsWithCategoryAndUser[]
  >([]);

  useEffect(() => {
    if (products) {
      const sortedProducts = [...products].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setRecentProducts(sortedProducts.slice(0, 8));
    }
  }, [products]);

  if (!recentProducts.length) return null;

  return (
    <section className="bg-gradient-to-r from-background to-secondary/10 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Recently Added Products
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our latest arrivals and stay ahead of the curve with our
            freshest product releases.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto"
        >
          <CarouselContent>
            {recentProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4"
              >
                <div className="p-1">
                  <ProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="justify-center mt-8 gap-4 hidden sm:flex">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <TransitionLink href="/shop">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </TransitionLink>
          </Button>
        </div>
      </div>
    </section>
  );
}
