"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Logo } from "../logo";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "../ui/sheet";
import { UserAction } from "./userAction";
import { HeaderNavigation } from "./HeaderNavigation";
import { NavbarActions } from "./NavbarActions";
import { useMediaQuery } from "@/hooks/use-media-query";

export const Header = () => {
  const isMediumDevice = useMediaQuery("(min-width : 768px)");

  return (
    <header
      className={cn(
        "sticky top-0 left-0 z-50 h-14 md:h-16 bg-background shadow-sm"
      )}
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
    </header>
  );
};
