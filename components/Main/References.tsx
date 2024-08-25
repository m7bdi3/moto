"use client";

import { RefreshCwIcon, ShieldIcon, TruckIcon } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

const ReferenceItem = ({ icon: Icon, title, description }: any) => (
  <motion.div
    className="flex items-start gap-4 bg-background p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow h-32"
    variants={itemVariants}
  >
    <Icon className="h-8 w-8 text-primary flex-shrink-0" />
    <div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

export const References = () => {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-muted">
      <motion.div
        className="container px-4 md:px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight mb-4">
            Why Choose Moto Shop?
          </h2>
          <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Discover the benefits of shopping with us, from free shipping to our
            money-back guarantee.
          </p>
        </motion.div>
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          <ReferenceItem
            icon={TruckIcon}
            title="Free Shipping"
            description="Enjoy free shipping on all orders over $50."
          />
          <ReferenceItem
            icon={RefreshCwIcon}
            title="Money-Back Guarantee"
            description="If you're not satisfied, we'll refund your money."
          />
          <ReferenceItem
            icon={ShieldIcon}
            title="Secure Payments"
            description="Your payment information is safe with us."
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
