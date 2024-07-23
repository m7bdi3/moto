import Image from "next/image";
import React from "react";

const products = [
  {
    id: 1,
    name: "Acme Prism T-Shirt",
    description: "Comfortable and stylish cotton blend tee",
    price: 29.99,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Acme Hiking Backpack",
    description: "Durable and spacious backpack for your adventures",
    price: 59.99,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Acme Wireless Headphones",
    description: "High-quality sound with a comfortable fit",
    price: 99.99,
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Acme Outdoor Camping Gear",
    description: "Everything you need for your next camping trip",
    price: 149.99,
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Acme Smart Home Devices",
    description: "Automate and control your home with ease",
    price: 79.99,
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Acme Fitness Tracker",
    description: "Monitor your activity and health with precision",
    price: 49.99,
    image: "/placeholder.svg",
  },
  {
    id: 7,
    name: "Acme Outdoor Apparel",
    description: "Stylish and functional clothing for the outdoors",
    price: 39.99,
    image: "/placeholder.svg",
  },
  {
    id: 8,
    name: "Acme Kitchen Appliances",
    description: "High-performance appliances for your kitchen",
    price: 199.99,
    image: "/placeholder.svg",
  },
];

export const ProductsSections = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Featured Products
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover our curated selection of the best products for your
              needs.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className="group flex flex-col rounded-md border bg-background p-4 shadow-sm transition-all hover:bg-accent hover:text-accent-foreground"
            >
              <Image
                src="/placeholder.svg"
                width="300"
                height="300"
                alt={product.name}
                className="mx-auto aspect-square overflow-hidden rounded-md object-cover"
              />
              <div className="mt-4 flex flex-col items-start justify-between space-y-2">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-muted-foreground">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
