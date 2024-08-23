"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { TransitionLink } from "../LinkTransition";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-background to-secondary/20 h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-[1fr_400px] md:gap-12 lg:grid-cols-[1fr_600px]">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Discover the Perfect Product for You
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Browse our curated collection of high-quality products and find
                the one that fits your needs.
              </p>
            </div>
            <div className="flex flex-col gap-2 md:flex-row">
              <Button asChild size="lg" className="w-full min-[400px]:w-auto">
                <TransitionLink href="/shop">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </TransitionLink>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full min-[400px]:w-auto"
              >
                <TransitionLink href="/about">Learn More</TransitionLink>
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full h-full max-w-[400px] aspect-square">
              <Image
                src="/main/hero2.png"
                alt="Hero Product"
                fill
                className="rounded-lg object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
