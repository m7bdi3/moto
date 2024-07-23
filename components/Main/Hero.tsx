import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Hero = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid gap-6 px-4 md:px-6 md:grid-cols-2 lg:gap-12">
        <Image
          src="/main/hero2.jpeg"
          width="550"
          height="550"
          alt="Hero Product"
          className="mx-auto aspect-square overflow-hidden rounded-xl object-cover w-full"
        />
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2 text-center md:text-start">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Discover the Perfect Product for You
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Browse our curated collection of high-quality products and find
              the one that fits your needs.
            </p>
          </div>
          <Link
            href="#"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};
