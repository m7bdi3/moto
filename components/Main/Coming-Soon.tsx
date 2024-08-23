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
import { Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function ComingSoon() {
  const { products } = useStore();
  const filteredProducts = products?.filter((product) => product.isArchived);
  if (filteredProducts?.length === 0) return null;
  return (
    <section className="bg-gradient-to-r from-background to-primary/5 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4 flex items-center justify-center">
            <Clock className="mr-2 h-8 w-8 text-primary" />
            Coming Soon
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get a sneak peek at our exciting upcoming product releases. Be the
            first to know what&apos;s next!
          </p>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto"
        >
          <CarouselContent>
            {filteredProducts?.map((product) => (
              <CarouselItem
                key={product.id}
                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4"
              >
                <motion.div
                  className="p-1"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="sm:flex hidden justify-center mt-8 gap-4">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
