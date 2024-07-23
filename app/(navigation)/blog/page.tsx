"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { SearchIcon } from "lucide-react";

export default function Page() {
  const recentPosts = [
    {
      id: 1,
      title: "The Ultimate Guide to Sustainable Fashion",
      excerpt:
        "Discover how to build an eco-friendly wardrobe and reduce your fashion footprint.",
      image: "/main/hero2.jpeg",
    },
    {
      id: 2,
      title: "5 Trending Accessories for Summer 2024",
      excerpt:
        "Stay on top of the latest fashion trends with these must-have summer accessories.",
      image: "/main/hero2.jpeg",
    },
    {
      id: 3,
      title: "How to Care for Your Leather Goods",
      excerpt:
        "Learn the best practices for maintaining the quality and longevity of your leather products.",
      image: "/main/hero2.jpeg",
    },
    {
      id: 4,
      title: "The Rise of Athleisure: Comfort Meets Style",
      excerpt:
        "Explore the growing trend of athleisure and how to incorporate it into your wardrobe.",
      image: "/main/hero2.jpeg",
    },
    {
      id: 5,
      title: "Minimalist Wardrobe Essentials for Every Season",
      excerpt:
        "Build a versatile, sustainable wardrobe with these timeless and practical pieces.",
      image: "/main/hero2.jpeg",
    },
    {
      id: 6,
      title: "The Art of Layering: Mastering Transitional Dressing",
      excerpt:
        "Learn how to effortlessly layer your clothing for any weather or occasion.",
      image: "/main/hero2.jpeg",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const totalPages = Math.ceil(recentPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = recentPosts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="w-full">
      <section className="relative h-[500px] overflow-hidden">
        <Image
          src="/main/hero2.jpeg"
          alt="Featured Blog Post"
          width={1200}
          height={500}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
          <h1 className="text-3xl font-bold  md:text-4xl lg:text-5xl">
            The Ultimate Guide to Sustainable Fashion
          </h1>
          <p className="mt-4 text-lg  md:text-xl lg:text-2xl">
            Discover how to build an eco-friendly wardrobe and reduce your
            fashion footprint.
          </p>
        </div>
      </section>
      <div className="container mx-auto my-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {currentPosts.map((post) => (
          <Link href="#" key={post.id} className="group" prefetch={false}>
            <div className="overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out group-hover:scale-105">
              <Image
                src="/main/hero2.jpeg"
                alt={post.title}
                width={400}
                height={225}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold ">{post.title}</h2>
                <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="container mx-auto my-12 flex justify-center">
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => paginate(currentPage - 1)}
                />
              </PaginationItem>
            )}
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => paginate(index + 1)}
                  isActive={index + 1 === currentPage}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => paginate(currentPage + 1)}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
      <div className="container mx-auto my-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="rounded-lg bg-muted p-6">
          <h3 className="text-xl font-bold ">Categories</h3>
          <div className="mt-4 grid gap-2">
            <Link
              href="#"
              className="text-muted-foreground hover:"
              prefetch={false}
            >
              Fashion
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:"
              prefetch={false}
            >
              Accessories
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:"
              prefetch={false}
            >
              Sustainable Living
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:"
              prefetch={false}
            >
              Trends
            </Link>
          </div>
        </div>
        <div className="rounded-lg bg-muted p-6">
          <h3 className="text-xl font-bold ">Tags</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="#"
              className="rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground hover:bg-primary/90"
              prefetch={false}
            >
              Fashion
            </Link>
            <Link
              href="#"
              className="rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground hover:bg-primary/90"
              prefetch={false}
            >
              Sustainable
            </Link>
            <Link
              href="#"
              className="rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground hover:bg-primary/90"
              prefetch={false}
            >
              Accessories
            </Link>
            <Link
              href="#"
              className="rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground hover:bg-primary/90"
              prefetch={false}
            >
              Trends
            </Link>
            <Link
              href="#"
              className="rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground hover:bg-primary/90"
              prefetch={false}
            >
              Wardrobe
            </Link>
          </div>
        </div>
        <div className="rounded-lg bg-muted p-6">
          <h3 className="text-xl font-bold ">Search</h3>
          <div className="mt-4">
            <form>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search blog posts..."
                  className="w-full rounded-lg bg-background pl-8 shadow-none"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
