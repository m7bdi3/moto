"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ProductsWithCategoryAndUser, RelatedProductsType } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBasket, ZoomIn } from "lucide-react";
import { useModalStore } from "@/hooks/store/use-store-modal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RelatedProducts } from "./RelatedProducts";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { useCartStore } from "@/hooks/store/use-cart-store";
import { useSession } from "next-auth/react";

interface Props {
  product: ProductsWithCategoryAndUser;
  category: RelatedProductsType;
}

export const ProductPage = ({ product, category }: Props) => {
  const session = useSession();
  const { addItem } = useCartStore();
  const { openImageViewer, openLogin } = useModalStore();
  const handleAddToCart = () => {
    if (!session || !session.data?.user.id) {
      openLogin();
    } else {
      addItem(product);
    }
  };
  const [imagePlace, setImagePlace] = useState(
    product.productImages[0].imageUrl
  );

  const uniqueSizes = Array.from(
    new Set(product.variants.map((variant) => variant.size.value))
  );

  const uniqueColors = Array.from(
    new Set(product.variants.map((variant) => variant.color.value))
  );

  return (
    <div className="container py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Section: Image Gallery */}
        <div className="space-y-6">
          <motion.div
            className="aspect-square relative rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={imagePlace}
              alt={`${product.name} image`}
              fill
              className="object-cover object-center"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute bottom-4 right-4"
              onClick={() => openImageViewer(imagePlace)}
            >
              <ZoomIn className="h-4 w-4" />
              <span className="sr-only">Zoom image</span>
            </Button>
          </motion.div>
          <ScrollArea className="w-full h-24">
            <div className="flex space-x-2 p-1">
              {product.productImages.map((image, index) => (
                <Tooltip key={index} delayDuration={100}>
                  <TooltipTrigger asChild>
                    <motion.div
                      className="shrink-0 aspect-square w-20 rounded-md overflow-hidden shadow-sm cursor-pointer"
                      onClick={() => setImagePlace(image.imageUrl)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src={image.imageUrl}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>View image {index + 1}</TooltipContent>
                </Tooltip>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Right Section: Product Details */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>
            <p className="text-lg text-muted-foreground">
              {category.name} - {""}
              {category.parent?.id && (
                <span className="text-muted-foreground text-xs">
                  {category.parent.name}
                </span>
              )}
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger>Product Description</AccordionTrigger>
              <AccordionContent>{product.description}</AccordionContent>
            </AccordionItem>
          </Accordion>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="sizes">Sizes</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4">
              <div className="bg-muted rounded-lg p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Price:</span>{" "}
                    <span>${product.price}</span>
                  </div>
                  <div>
                    <span className="font-medium">Weight:</span>{" "}
                    <span>{product.weightValue} kg</span>
                  </div>
                  <div>
                    <span className="font-medium">Stock:</span>
                    <Badge
                      variant={product.isArchived ? "destructive" : "default"}
                      className="ml-2"
                    >
                      {product.isArchived ? "Out of Stock" : "In Stock"}
                    </Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="colors" className="mt-4">
              <div className="flex flex-wrap gap-3 bg-muted rounded-lg p-4">
                {uniqueColors.map((productColor, key) => (
                  <Tooltip key={key} delayDuration={100}>
                    <TooltipTrigger asChild>
                      <Badge
                        variant="outline"
                        className="h-8 w-8 rounded-full p-0 border-2"
                        style={{ backgroundColor: productColor }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>{productColor}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="sizes" className="mt-4">
              <div className="flex flex-wrap gap-3 bg-muted rounded-lg p-4">
                {uniqueSizes.map((productSize, key) => (
                  <Badge key={key} variant="secondary" className="text-base">
                    {productSize}
                  </Badge>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          <Button
            className="w-full py-6 text-lg font-semibold"
            disabled={product.isArchived}
            onClick={handleAddToCart}
          >
            <ShoppingBasket className="w-5 h-5 mr-2" />
            {product.isArchived ? "Out of Stock" : "Add to Cart"}
          </Button>

          <RelatedProducts category={category} />
        </div>
      </div>
    </div>
  );
};
