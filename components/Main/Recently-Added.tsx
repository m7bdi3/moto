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
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useAnimation,
} from "framer-motion";
import { useEffect, useRef } from "react";

export default function RecentlyAdded() {
  const { products } = useStore();
  const ref = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

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
    <motion.section
      ref={ref}
      className="bg-gradient-to-r from-background to-secondary/10 py-16 md:py-24 overflow-hidden"
      style={{ opacity, scale }}
    >
      <motion.div
        className="container mx-auto px-4 "
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.h2
            className="text-3xl font-bold tracking-tight md:text-4xl mb-4"
            variants={itemVariants}
          >
            Recently Added Products
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Discover our latest arrivals and stay ahead of the curve with our
            freshest product releases.
          </motion.p>
        </motion.div>

        <motion.div variants={itemVariants} ref={carouselRef}>
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
      </motion.div>
    </motion.section>
  );
}
