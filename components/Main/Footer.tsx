import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const LinkFooter = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link href={href} className=" hover:underline" prefetch={false}>
      {text}
    </Link>
  );
};

export const Footer = () => {
  return (
    <footer className="flex flex-col gap-2  py-6 w-full shrink-0  items-center px-4 md:px-6 border-t bg-muted">
      <div className="w-full flex items-center gap-2">
        <ShoppingBagIcon className="h-8 w-8" />
        <p className="text-xl font-bold tracking-tighter md:text-2xl">
          Acme Store
        </p>
      </div>
      <div className=" p-4 md:py-12 w-full">
        <div className="container w-full grid grid-cols-2 md:grid-cols-3  gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold text-base md:text-lg">Company</h3>
            <div className="grid ml-4">
              <LinkFooter href="about" text="About us" />
              <LinkFooter href="careers" text="Careers" />
              <LinkFooter href="news" text="News" />
              <LinkFooter href="newsletter" text="Newsletter" />
            </div>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold text-base md:text-lg">Products</h3>
            <div className="grid ml-4">
              <LinkFooter href="apparel" text="Apparel" />
              <LinkFooter href="home-decor" text="Home Decor" />
              <LinkFooter href="gifts" text="Gifts" />
              <LinkFooter href="products" text="All Products" />
            </div>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold text-base md:text-lg">Resources</h3>
            <div className="grid ml-4">
              <LinkFooter href="blog" text="Blog" />
              <LinkFooter href="faqs" text="FAQs" />
              <LinkFooter href="shipping-returns" text="Shipping & Returns" />

              <LinkFooter href="partnerships" text="Partnerships" />
            </div>
          </div>
        </div>
      </div>
      <nav className="sm:mx-auto flex gap-4 sm:gap-6">
        <Link
          href="/terms"
          className="text-xs hover:underline underline-offset-4"
          prefetch={false}
        >
          Terms of Service
        </Link>
        <Link
          href="/policy"
          className="text-xs hover:underline underline-offset-4"
          prefetch={false}
        >
          Privacy Policy
        </Link>
        <Link
          href="/contact"
          className="text-xs hover:underline underline-offset-4"
          prefetch={false}
        >
          Contact Us
        </Link>
        <Link
          href="/followUs"
          className="text-xs hover:underline underline-offset-4"
          prefetch={false}
        >
          Follow Us
        </Link>
        <Link
          href="/cookies"
          className="text-xs hover:underline underline-offset-4"
          prefetch={false}
        >
          Cookies Policy
        </Link>
      </nav>
      <p className="text-xs text-muted-foreground">
        &copy; 2024 Acme Shop. All rights reserved.
      </p>
    </footer>
  );
};
