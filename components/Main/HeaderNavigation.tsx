"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronsUpDown, Dot } from "lucide-react";
import { useStore } from "@/hooks/store/use-store";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { TransitionLink } from "@/components/LinkTransition";
import { CategoryWithBillboardAndUser } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  isMobile: boolean;
}

export const HeaderNavigation = ({ isMobile }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { Categories } = useStore();

  const navItems = [{ href: "/sale", label: "Sale" }];

  const renderCategories = (
    category: CategoryWithBillboardAndUser,
    isChild = false
  ) => (
    <li key={category.id} className={`cursor-pointer ${isChild ? "ml-4" : ""}`}>
      <div>
        <Link href={`/shop/${category.id}`} className="block" prefetch>
          <div
            className={cn(
              "flex items-center gap-2 p-2 rounded-md  group transition-all ease-in duration-300",
              category.parentId !== null && "hover:bg-muted"
            )}
          >
            {category.parentId !== null && (
              <ArrowRight className="w-5 h-5 text-primary hidden group-hover:block" />
            )}
            <span className="font-medium">{category.name}</span>
          </div>
        </Link>
      </div>
      {category.parentId === null && (
        <ul className="space-y-1 mt-1 text-sm hover:rounded-md">
          {category.children.map((child: any) => renderCategories(child, true))}
        </ul>
      )}
    </li>
  );

  const MobileNav = () => (
    <nav className="flex flex-col items-start justify-center gap-4 w-full h-full">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full transition-all duration-300"
      >
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Shop</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle shop menu</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="mt-2">
          <ul className="space-y-2 bg-muted rounded-md p-2">
            {Categories?.filter((category) => category.parentId === null)
              .map((category) => renderCategories(category))
              .reverse()}
          </ul>
        </CollapsibleContent>
      </Collapsible>
      {navItems.map((item) => (
        <TransitionLink
          key={item.href}
          href={item.href}
          className="text-lg font-medium hover:underline hover:underline-offset-4"
        >
          {item.label}
        </TransitionLink>
      ))}
    </nav>
  );

  const DesktopNav = () => (
    <NavigationMenu className="hidden md:block ml-auto">
      <NavigationMenuList className="flex gap-6 items-center">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[350px] p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <TransitionLink
                    href="/shop"
                    prefetch
                    className="block p-4 text-center bg-muted rounded-md hover:bg-primary hover:text-primary-foreground transition-colors "
                  >
                    View all categories
                  </TransitionLink>
                </div>
                <ul className="space-y-2 col-span-2">
                  {Categories?.filter((category) => category.parentId === null)
                    .map((category) => renderCategories(category))
                    .reverse()}
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {navItems.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink asChild>
              <TransitionLink
                href={item.href}
                prefetch
                className="text-base font-medium hover:underline hover:underline-offset-4"
              >
                {item.label}
              </TransitionLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );

  return isMobile ? <MobileNav /> : <DesktopNav />;
};
