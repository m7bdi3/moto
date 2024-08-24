"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { MenuIcon, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { HeaderNavigation } from "./HeaderNavigation";
import { UserAction } from "./userAction";
import { NavbarActions } from "./NavbarActions";

export const Header = () => {
  const isMediumDevice = useMediaQuery("(min-width: 768px)");
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100);
  });

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 z-50 h-14 md:h-16  w-full transition-colors duration-300",
        isScrolled ? "bg-background shadow-sm" : "bg-transparent"
      )}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center h-full">
        {isMediumDevice ? (
          <>
            <Logo />
            <HeaderNavigation isMobile={false} />
          </>
        ) : (
          <>
            <Sheet>
              <SheetTrigger className="md:hidden mr-4">
                <MenuIcon size={20} />
              </SheetTrigger>
              <SheetContent
                side="left"
                className="md:hidden h-full flex flex-col"
              >
                <Logo />
                <HeaderNavigation isMobile />
                <SheetFooter>
                  <UserAction />
                </SheetFooter>
              </SheetContent>
            </Sheet>
            <Logo />
          </>
        )}
        <NavbarActions />
      </div>
    </motion.header>
  );
};
