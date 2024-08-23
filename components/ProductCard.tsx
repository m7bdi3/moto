"use client";

import Image from "next/image";
import { ProductsWithCategoryAndUser } from "@/types";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { useState } from "react";
import { ShoppingBasket, Eye, HeartIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useModalStore } from "@/hooks/store/use-store-modal";
import { Badge } from "./ui/badge";
import { useCartStore } from "@/hooks/store/use-cart-store";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { addFavorite, deleteFavorite } from "@/actions/favorite";
import { useFavoritesStore } from "@/hooks/store/use-favorite-store";
import { toast } from "sonner";

interface Props {
  product: ProductsWithCategoryAndUser;
}

export default function ProductCard({ product }: Props) {
  const [imagePlace, setImagePlace] = useState(
    product.productImages[0].imageUrl
  );
  const { openLogin } = useModalStore();
  const session = useSession();
  const { addItem } = useCartStore();
  const { isFavorite, addToFavorite, removeFavorite } = useFavoritesStore();
  const handleAddToCart = () => {
    if (!session || !session.data?.user.id) {
      openLogin();
    } else {
      addItem(product);
    }
  };

  const isInfavorite = isFavorite(session.data?.user.id!, product.id);

  const handleFavorite = async () => {
    if (!session || !session.data?.user.id) {
      openLogin();
    } else {
      if (isInfavorite) {
        await deleteFavorite(product.id);
        removeFavorite(session.data.user.id, product.id);
        toast.warning(`${product.name} has been deleted from favorites`);
      } else {
        await addFavorite(product.id);
        addToFavorite(session.data.user.id, product.id);
        toast.success(`${product.name} has been added to favorites`);
      }
    }
  };

  return (
    <div className="group bg-card rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg max-w-[300px] h-full">
      <div className="relative aspect-square">
        <Image
          src={imagePlace}
          alt={`${product.name}`}
          fill
          className="transition-transform duration-300 group-hover:scale-105 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ScrollArea className="w-full h-12">
            <div className="flex items-center space-x-2 p-1">
              {product.productImages.map((image, index) => (
                <button
                  key={index}
                  className="relative w-10 h-10 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => setImagePlace(image.imageUrl)}
                  aria-label={`View ${product.name} image ${index + 1}`}
                >
                  <Image
                    src={image.imageUrl}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
      <div className="p-4">
        <div className="block group">
          <div className="w-full flex items-center justify-between">
            <h3 className="font-semibold text-lg tracking-tight truncate group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <Button
              variant={"outline"}
              size={"icon"}
              className="h-8 w-8 bg-transparent hover:bg-transparent border-0"
              onClick={handleFavorite}
            >
              <HeartIcon
                className={cn(
                  " h-[1.2rem] w-[1.2rem]",
                  isInfavorite
                    ? "fill-primary"
                    : "fill-gray-400 hover:fill-primary"
                )}
              />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-lg">${product.price}</span>
            <Badge variant="secondary" className="text-xs">
              {product.category.name}
            </Badge>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between w-full">
          <Button
            className={cn(
              "w-full flex items-center justify-center gap-2 text-xs md:text-sm",
              product.isArchived && "opacity-50 cursor-not-allowed"
            )}
            onClick={handleAddToCart}
            disabled={product.isArchived}
          >
            {product.isArchived ? (
              "Out of Stock"
            ) : (
              <>
                <ShoppingBasket className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </Button>
          <Link href={`/shop/product/${product.id}`} passHref>
            <Button
              variant="outline"
              className="ml-2"
              aria-label="View product details"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
