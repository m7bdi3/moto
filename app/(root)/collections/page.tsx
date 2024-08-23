"use client";

import { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Component() {
  const products = [
    {
      id: 1,
      name: "Vintage Camera",
      description: "A classic camera with a timeless design",
      price: 99.99,
      image: "/main/hero2.jpeg",
      category: "Accessories",
      color: "black",
    },
    {
      id: 2,
      name: "Leather Backpack",
      description: "A durable and stylish backpack",
      price: 149.99,
      image: "/main/hero2.jpeg",
      category: "Bags",
      color: "brown",
    },
    {
      id: 3,
      name: "Wireless Headphones",
      description: "High-quality audio experience",
      price: 79.99,
      image: "/main/hero2.jpeg",
      category: "Electronics",
      color: "white",
    },
    {
      id: 4,
      name: "Linen Shirt",
      description: "Breathable and comfortable shirt",
      price: 59.99,
      image: "/main/hero2.jpeg",
      category: "Clothing",
      color: "blue",
    },
    {
      id: 5,
      name: "Ceramic Mug",
      description: "Handcrafted and durable mug",
      price: 24.99,
      image: "/main/hero2.jpeg",
      category: "Home",
      color: "white",
    },
    {
      id: 6,
      name: "Wooden Sunglasses",
      description: "Eco-friendly and stylish sunglasses",
      price: 39.99,
      image: "/main/hero2.jpeg",
      category: "Accessories",
      color: "brown",
    },
  ];
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (
        selectedCategory.length > 0 &&
        !selectedCategory.includes(product.category)
      ) {
        return false;
      }
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, priceRange]);
  return (
    <div>
      <section className="bg-background py-12 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Image
                src="/main/hero2.jpeg"
                alt="Hero Product"
                width={800}
                height={600}
                className="rounded-md object-cover w-full"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-4">
                Discover Our Collection
              </h1>
              <p className="text-muted-foreground mb-8">
                Explore our curated selection of high-quality products for your
                lifestyle.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-[240px_1fr] gap-8">
            <div>
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-medium mb-2">Category</h3>
                  <div className="space-y-2">
                    {[
                      "Accessories",
                      "Bags",
                      "Electronics",
                      "Clothing",
                      "Home",
                    ].map((category) => (
                      <Label
                        key={category}
                        className="flex items-center gap-2 font-normal"
                      >
                        <Checkbox
                          checked={selectedCategory.includes(category)}
                          onCheckedChange={() => {
                            if (selectedCategory.includes(category)) {
                              setSelectedCategory(
                                selectedCategory.filter((c) => c !== category)
                              );
                            } else {
                              setSelectedCategory([
                                ...selectedCategory,
                                category,
                              ]);
                            }
                          }}
                        />
                        {category}
                      </Label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-medium mb-2">Price Range</h3>
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([
                          parseFloat(e.target.value),
                          priceRange[1],
                        ])
                      }
                      className="w-24"
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([
                          priceRange[0],
                          parseFloat(e.target.value),
                        ])
                      }
                      className="w-24"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-background rounded-md overflow-hidden shadow-lg"
                  >
                    <Image
                      src="/main/hero2.jpeg"
                      alt={product.name}
                      width={400}
                      height={300}
                      className="w-full h-60 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">
                          ${product.price}
                        </span>
                        <Button size="sm">Add to Cart</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
