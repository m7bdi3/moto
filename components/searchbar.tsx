import React, { useState } from "react";
import Image from "next/image";

import { SearchIcon } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Button } from "./ui/button";
import Link from "next/link";
import { useStore } from "@/hooks/store/use-store";

export const Searchbar = () => {
  const [open, setOpen] = useState(false);
  const { products } = useStore();

  return (
    <>
      <Button
        onClick={() => {
          setOpen(!open);
        }}
        size={"icon"}
        variant={"outline"}
        className="border-none h-8 w-8 bg-transparent rounded-full"
      >
        <SearchIcon className="w-[1.2rem] h-[1.2rem]" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {products?.length! > 0 && (
            <CommandGroup heading="Products">
              {products?.slice(0, 5).map((product) => (
                <CommandItem
                  className="h-16 flex items-center w-full"
                  key={product.id}
                >
                  <Link
                    href={`/shop/product/${product.id}`}
                    className="flex items-center w-full"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <Image
                      src={product.productImages[0].imageUrl}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="object-cover h-[40px] w-[40px] object-center rounded-md mr-4"
                    />
                    <p className="font-semibold">{product.name}</p>
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};
