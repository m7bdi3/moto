"use client";

import React from "react";

import { ProductsWithCategoryAndUser, RelatedProductsType } from "@/types";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge, ShoppingBasket } from "lucide-react";
import { useModalStore } from "@/hooks/store/use-store-modal";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/hooks/store/use-cart-store";

interface Props {
  category: RelatedProductsType;
}

export const RelatedProducts = ({ category }: Props) => {
  return (
    <section className="w-full container mx-auto p-4 md:px-8 bg-zinc-100 dark:bg-zinc-800 rounded-md">
      <h2 className="font-semibold text-lg tracking-tighter mb-6 dark:text-zinc-300 text-zinc-700">
        You might also be interested in
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {category.products.slice(0, 3).map((product) => (
          <RelatedProductCard
            key={product.id}
            product={product as ProductsWithCategoryAndUser}
          />
        ))}
      </div>
    </section>
  );
};

const RelatedProductCard = ({
  product,
}: {
  product: ProductsWithCategoryAndUser;
}) => {
  const { openLogin } = useModalStore();
  const session = useSession();
  const { addItem } = useCartStore();
  const onClick = (item: ProductsWithCategoryAndUser) => {
    if (!session || !session.data?.user.id) {
      return openLogin();
    } else {
      return addItem(item);
    }
  };
  return (
    <div className="grid gap-4 bg-card rounded-md max-w-[260px] place-self-center">
      <div className="grid gap-2.5 group">
        <div className="overflow-hidden h-36">
          <Image
            src={product.productImages[0].imageUrl}
            alt={`${product.name} image`}
            width={200}
            height={200}
            className="rounded-t-md h-36 object-cover object-center w-full aspect-square hover:scale-105 group-hover:opacity-85 transition-opacity "
          />
        </div>
        <Link href={`/shop/product/${product.id}`} className="grid gap-2 px-3">
          <div className="flex items-center w-full justify-between">
            <h3 className="font-semibold lg:text-lg text-base">
              {" "}
              {product.name}
            </h3>
            <h4 className="font-semibold  ml-auto">
              $ {product.variants[0].price}
            </h4>
          </div>
          <p className="text-xs leading-tighter truncate text-muted-foreground">
            {product.description}
          </p>
        </Link>
      </div>

      <div className="flex w-full p-2 pb-4 items-center justify-center h-12">
        {product.isArchived === false ? (
          <Button
            className="w-full flex items-center gap-2"
            size={"icon"}
            onClick={() => onClick(product)}
          >
            <ShoppingBasket className="w-6 h-6" /> Add to cart
          </Button>
        ) : (
          <Badge className="text-xs w-fit h-8 ml-auto">out of stock</Badge>
        )}
      </div>
    </div>
  );
};
