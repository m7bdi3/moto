"use client";
import { useCartStore } from "@/hooks/store/use-cart-store";
import React, { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Link from "next/link";
import { ShoppingBagIcon } from "lucide-react";
import { UserAction } from "./userAction";
import { useSession } from "next-auth/react";
import { Searchbar } from "../searchbar";
import { ModeToggle } from "../ui/darkToggle";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";

export const NavbarActions = () => {
  const { items } = useCartStore();
  const { data } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      className="ml-auto flex items-center gap-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:text-foreground"
            >
              <Searchbar />
              <span className="sr-only">Search</span>
            </Link>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="bottom">Search</TooltipContent>
      </Tooltip>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <ModeToggle />
      </motion.div>
      {data?.user.id && (
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Link href="/cart" passHref>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="rounded-full w-8 h-8 bg-transparent relative"
                  variant="outline"
                  size="icon"
                >
                  <AnimatePresence>
                    {items.length === 0 ? (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ShoppingBagIcon className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="items"
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {items.length}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span className="sr-only">Cart</span>
                </Button>
              </motion.div>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom">Cart ({items.length})</TooltipContent>
        </Tooltip>
      )}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <UserAction />
      </motion.div>
    </motion.div>
  );
};
