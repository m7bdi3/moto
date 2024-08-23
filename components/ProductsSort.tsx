"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Props {
  sortOption: string;
  setSortOption: (value: string) => void;
}

export const ProductsSort = ({ sortOption, setSortOption }: Props) => {
  return (
    <div className="w-full flex justify-end">
      <Select onValueChange={setSortOption} value={sortOption}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recent">Most Recent</SelectItem>
          <SelectItem value="price-low-high">Price: Low to High</SelectItem>
          <SelectItem value="price-high-low">Price: High to Low</SelectItem>
          <SelectItem value="name-a-z">Name: A to Z</SelectItem>
          <SelectItem value="name-z-a">Name: Z to A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
