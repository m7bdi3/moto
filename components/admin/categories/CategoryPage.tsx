"use client";
import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import {
  Table,
  TableCaption,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from "@/components/ui/table";

import Link from "next/link";

import { CategoryPageWithProducts } from "@/types";

export const CategoryPage = ({
  products,
}: {
  products: CategoryPageWithProducts;
}) => {
  return (
    <div className="w-full flex flex-col h-full p-4 ">
      <Table className="bg-card border rounded-md">
        <TableCaption>A list of your products.</TableCaption>
        <TableHeader className="rounded-md">
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.products.length > 0 ? (
            products.products.map((product, index) => (
              <TableRow
                key={index}
                className="h-16 break-words leading-tight text-xs"
              >
                <TableCell className="max-w-[50px] px-0 pl-2">
                  <Image
                    src={product.productImages[0].imageUrl}
                    alt={product.name}
                    width={50}
                    height={40}
                    className="rounded-md object-cover"
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell className="max-w-[30px]">
                  {format(product.createdAt, "PP")}
                </TableCell>
                <TableCell className="max-w-[30px]">{product.sku}</TableCell>
                <TableCell className="max-w-[30px]">
                  {product.price.toString()}
                </TableCell>
                <TableCell className="w-fit">
                  {product.isArchived ? "Archived" : "Stock"}
                </TableCell>

                <TableCell className="text-center">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="font-bold text-lg"
                  >
                    ...
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
