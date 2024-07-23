import {
  Package2Icon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

export const Header = () => {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 md:px-6 flex items-center h-14">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold"
          prefetch={false}
        >
          <Package2Icon className="h-6 w-6" />
          <span className="">Acme Ecommerce</span>
        </Link>
        <nav className="ml-auto md:flex gap-4 hidden">
          <Link
            href="/shop"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Shop
          </Link>
          <Link
            href="/collections"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Collections
          </Link>
          <Link
            href="/sale"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Sale
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            About
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <SearchIcon className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ShoppingCartIcon className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <UserIcon className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
