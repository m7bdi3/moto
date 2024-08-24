"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { TransitionLink } from "@/components/LinkTransition";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useAnimation,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  const controls = useAnimation();
  const isInView = useInView(ref);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
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

  const wordsVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
      },
    }),
  };

  return (
    <motion.section
      ref={ref}
      className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden h-screen"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isMounted && (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <motion.div className="absolute inset-0 z-0 bg-gradient-to-r dark:from-background from-gray-400 to-transparent via-transparent" />
      <div className="container px-4 md:px-6 z-10">
        <motion.div
          className="grid gap-6 md:grid-cols-2 md:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            className="flex flex-col justify-center space-y-4"
            style={{ y: textY }}
          >
            <motion.div className="space-y-2" variants={itemVariants}>
              <motion.h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-center md:text-start"
                variants={itemVariants}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {["Discover", "the", "Perfect", "Product", "for", "You"].map(
                  (word, index) => (
                    <motion.span
                      key={index}
                      className="inline-block mr-3"
                      animate={controls}
                      variants={wordsVariants}
                      custom={index}
                    >
                      {word}
                    </motion.span>
                  )
                )}
              </motion.h1>
              <motion.p
                className="max-w-[600px] dark:text-muted-foreground text-zinc-800 md:text-xl text-center md:text-start"
                variants={itemVariants}
              >
                Browse our curated collection of high-quality products and find
                the one that fits your needs.
              </motion.p>
            </motion.div>
            <motion.div
              className="flex flex-col gap-2 sm:flex-row"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto"
              >
                <Button
                  asChild
                  size="lg"
                  className="w-full md:w-auto transition-all hover:shadow-lg"
                >
                  <TransitionLink href="/shop">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </TransitionLink>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto"
              >
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full md:w-auto transition-all hover:shadow-lg"
                >
                  <TransitionLink href="/about">Learn More</TransitionLink>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
