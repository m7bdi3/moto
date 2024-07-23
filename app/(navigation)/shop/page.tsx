"use client";

import { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import Image from "next/image";

export default function Component() {
  const products = [
    {
      id: 1,
      name: "Cozy Knit Sweater",
      description: "A soft and warm knit sweater perfect for fall",
      price: 49.99,
      image: "/main/hero2.jpeg",
      category: "Clothing",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Leather Tote Bag",
      description: "A stylish and durable leather tote bag",
      price: 79.99,
      image: "/main/hero2.jpeg",
      category: "Accessories",
      rating: 4.2,
    },
    {
      id: 3,
      name: "Ceramic Mug Set",
      description: "A set of handcrafted ceramic mugs",
      price: 24.99,
      image: "/main/hero2.jpeg",
      category: "Home",
      rating: 4.8,
    },
    {
      id: 4,
      name: "Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation",
      price: 99.99,
      image: "/main/hero2.jpeg",
      category: "Electronics",
      rating: 4.6,
    },
    {
      id: 5,
      name: "Outdoor Camping Chair",
      description: "A comfortable and portable camping chair",
      price: 59.99,
      image: "/main/hero2.jpeg",
      category: "Outdoor",
      rating: 4.3,
    },
    {
      id: 6,
      name: "Marble Cutting Board",
      description: "A durable and stylish marble cutting board",
      price: 39.99,
      image: "/main/hero2.jpeg",
      category: "Home",
      rating: 4.7,
    },
    {
      id: 7,
      name: "Fitness Tracker",
      description: "A sleek and feature-rich fitness tracker",
      price: 79.99,
      image: "/main/hero2.jpeg",
      category: "Electronics",
      rating: 4.4,
    },
    {
      id: 8,
      name: "Linen Throw Pillow",
      description: "A soft and cozy linen throw pillow",
      price: 29.99,
      image: "/main/hero2.jpeg",
      category: "Home",
      rating: 4.9,
    },
  ];
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    price: { min: 0, max: Infinity },
    rating: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (
          selectedFilters.category.length > 0 &&
          !selectedFilters.category.includes(product.category)
        ) {
          return false;
        }
        if (
          product.price < selectedFilters.price.min ||
          product.price > selectedFilters.price.max
        ) {
          return false;
        }
        if (product.rating < selectedFilters.rating) {
          return false;
        }
        return true;
      })
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [selectedFilters, currentPage]);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const handleFilterChange = (type: any, value: any) => {
    if (type === "category") {
      setSelectedFilters({
        ...selectedFilters,
        category: selectedFilters.category.includes(value)
          ? selectedFilters.category.filter((item) => item !== value)
          : [...selectedFilters.category, value],
      });
    } else if (type === "price") {
      setSelectedFilters({
        ...selectedFilters,
        price: value,
      });
    } else if (type === "rating") {
      setSelectedFilters({
        ...selectedFilters,
        rating: value,
      });
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 p-4 md:p-8">
      <div className="bg-background rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="grid gap-6">
          <div>
            <h3 className="text-base font-medium mb-2">Category</h3>
            <div className="grid gap-2">
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={selectedFilters.category.includes("Clothing")}
                  onCheckedChange={() =>
                    handleFilterChange("category", "Clothing")
                  }
                />
                Clothing
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={selectedFilters.category.includes("Accessories")}
                  onCheckedChange={() =>
                    handleFilterChange("category", "Accessories")
                  }
                />
                Accessories
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={selectedFilters.category.includes("Home")}
                  onCheckedChange={() => handleFilterChange("category", "Home")}
                />
                Home
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={selectedFilters.category.includes("Electronics")}
                  onCheckedChange={() =>
                    handleFilterChange("category", "Electronics")
                  }
                />
                Electronics
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={selectedFilters.category.includes("Outdoor")}
                  onCheckedChange={() =>
                    handleFilterChange("category", "Outdoor")
                  }
                />
                Outdoor
              </Label>
            </div>
          </div>
          <div>
            <h3 className="text-base font-medium mb-2">Price</h3>
            <div />
          </div>
          <div>
            <h3 className="text-base font-medium mb-2">Rating</h3>
            <div className="grid gap-2">
              <Label className="flex items-center gap-2 font-normal">
                <div />4 stars and above
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <div />3 stars and above
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <div />2 stars and above
              </Label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-background rounded-lg shadow-sm overflow-hidden"
            >
              <Image
                src="/main/hero2.jpeg"
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-semibold">
                    ${product.price}
                  </span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
