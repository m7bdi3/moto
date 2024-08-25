"use client";

import { useStore } from "@/hooks/store/use-store";
import ProductCard from "@/components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { TransitionLink } from "@/components/LinkTransition";
import { motion } from "framer-motion";

export default function RecentlyAdded() {
  const { products } = useStore();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="bg-gradient-to-r from-background to-secondary/10 py-16 md:py-24 overflow-hidden min-h-screen relative">
      <div className="container mx-auto px-4 ">
        <motion.div
          className="text-center mb-12"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.h2
            className="text-3xl font-bold tracking-tight md:text-4xl mb-4"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            Recently Added Products
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            Discover our latest arrivals and stay ahead of the curve with our
            freshest product releases.
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto"
          >
            <CarouselContent>
              {products?.slice(0, 8).map((product) => (
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
        </motion.div>
        <motion.div className="text-center mt-12" variants={itemVariants}>
          <Button asChild size="lg">
            <TransitionLink href="/shop">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </TransitionLink>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
