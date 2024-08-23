"use client";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, ShoppingBag, TrashIcon } from "lucide-react";
import { type CartItem, useCartStore } from "@/hooks/store/use-cart-store";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { createStripeUrl } from "@/actions/user_subs";
import { ProductsWithCategoryAndUser } from "@/types";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "SAR",
  }).format(amount);
};

export const CartComponent = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    updateVariant,
    removeAll,
    addItem,
  } = useCartStore();
  const [pending, startTransition] = useTransition();

  const { subtotal, tax, shippingCost, total } = useMemo(() => {
    const subtotal = items.reduce(
      (total, item) =>
        total + Number(item.selectedVariant.price) * item.quantity,
      0
    );
    const tax = subtotal * 0.15;
    const shippingCost = 10;
    const total = subtotal + tax + shippingCost;
    return { subtotal, tax, shippingCost, total };
  }, [items]);

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment successful");
      removeAll();
    }
    if (searchParams.get("canceled")) {
      toast.error("Payment cancelled");
    }
  }, [searchParams, removeAll]);

  const onCheckOut = async () => {
    if (pending) return;

    const incompleteItems = items.filter(
      (item) => !item.selectedVariant.colorId || !item.selectedVariant.sizeId
    );
    if (incompleteItems.length > 0) {
      toast.error("Please select color and size for all items before checkout");
      return;
    }

    startTransition(() => {
      createStripeUrl({ items })
        .then((res) => {
          if (res.data) {
            window.location.href = res.data;
          }
        })
        .catch(() =>
          toast.error("Something went wrong, please try again later!")
        );
    });
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="py-12 px-4 rounded-md dark:bg-zinc-900">
        <CardHeader className="w-full flex items-center mb-8">
          <ShoppingBag size={40} />
          <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
        </CardHeader>
        <CardContent>
          {items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    removeFromCart={removeItem}
                    updateQuantity={updateQuantity}
                    updateVariant={updateVariant}
                    addItem={addItem}
                  />
                ))}
              </div>

              <div className="rounded-md bg-muted dark:bg-card px-4 py-6 sm:p-6 lg:p-8 flex flex-col h-full justify-between">
                <div className="w-full mb-4 space-y-8">
                  <h2 className="text-xl font-semibold">
                    Order Summary ({items.length})
                  </h2>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="w-full flex justify-between items-center border-b last:border-none pb-2"
                      >
                        <div>
                          <p>{item.name}</p>
                          <p>
                            {formatCurrency(Number(item.selectedVariant.price))}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <p className="text-xs">Color</p>
                            <Badge
                              style={{
                                backgroundColor:
                                  item.selectedVariant?.colorValue || "#fff",
                              }}
                              className="w-6 h-6 rounded-full border-yellow-400"
                            />
                          </div>
                          <div className="flex flex-col items-center justify-center gap-2">
                            <p className="text-xs">Size</p>
                            <Badge>
                              {item.selectedVariant?.sizeValue || "S"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4 border-t pt-4">
                  <div className="flex justify-between">
                    <p>Subtotal:</p>
                    <p>{formatCurrency(subtotal)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping:</p>
                    <p>{formatCurrency(shippingCost)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Tax (15%):</p>
                    <p>{formatCurrency(tax)}</p>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <p>Total:</p>
                    <p>{formatCurrency(total)}</p>
                  </div>
                  <Button
                    className="w-full py-4 rounded-lg"
                    onClick={onCheckOut}
                    disabled={pending}
                  >
                    {pending ? "Processing..." : "Checkout"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xl text-center h-[50vh] flex items-center justify-center">
              Your cart is currently empty.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

type CartItemProps = {
  item: CartItem;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  updateVariant: (
    cartItemId: string,
    colorId: string,
    sizeId: string,
    colorValue: string,
    sizeValue: string
  ) => void;
  addItem: (data: ProductsWithCategoryAndUser) => void;
};

const CartItem: React.FC<CartItemProps> = ({
  item,
  removeFromCart,
  updateQuantity,
  updateVariant,
  addItem,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center border-b pb-6 last:border-b-0 bg-muted dark:bg-card p-4 rounded-md">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48 mb-4 md:mb-0">
        <Image
          src={item.productImages[0].imageUrl}
          alt={item.name}
          fill
          className="object-cover rounded-md object-center"
        />
      </div>
      <div className="ml-0 md:ml-6 flex-1 flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="flex flex-col gap-4 w-full md:w-2/3">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <VariantSelector item={item} updateVariant={updateVariant} />
            <div className="flex gap-2 items-center">
              <p className="font-semibold">Quantity:</p>
              <div className="flex border items-center justify-center p-0 h-fit w-fit rounded-md">
                <Input
                  type="number"
                  className="h-8 w-20"
                  value={item.quantity}
                  max={10}
                  min={1}
                  onChange={(e) => {
                    updateQuantity(
                      item.cartItemId,
                      Number(e.currentTarget.value)
                    );
                  }}
                />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <p className="text-lg font-bold">Price:</p>
              {formatCurrency(Number(item.selectedVariant.price))}
            </div>
          </div>
          <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-0">
            <Button
              onClick={() => removeFromCart(item.cartItemId)}
              className="text-red-500"
              size="icon"
              variant="outline"
            >
              <TrashIcon className="w-5 h-5" />
            </Button>
            <Button onClick={() => addItem(item)} size="icon" variant="outline">
              <PlusCircleIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface VariantProps {
  item: CartItem;
  updateVariant: (
    cartItemId: string,
    colorId: string,
    sizeId: string,
    colorValue: string,
    sizeValue: string
  ) => void;
}

const VariantSelector = ({ item, updateVariant }: VariantProps) => {
  const [selectedColor, setSelectedColor] = useState(
    item.selectedVariant.colorId || ""
  );
  const [selectedSize, setSelectedSize] = useState(
    item.selectedVariant.sizeId || ""
  );

  const uniqueColors = useMemo(
    () => Array.from(new Set(item.variants.map((v) => v.colorId))),
    [item.variants]
  );

  const availableSizes = useMemo(
    () =>
      selectedColor
        ? Array.from(
            new Set(
              item.variants
                .filter((v) => v.colorId === selectedColor)
                .map((v) => v.sizeId)
            )
          )
        : [],
    [selectedColor, item.variants]
  );

  useEffect(() => {
    if (selectedColor && selectedSize) {
      const variant = item.variants.find(
        (v) => v.colorId === selectedColor && v.sizeId === selectedSize
      );
      if (variant) {
        updateVariant(
          item.cartItemId,
          variant.colorId,
          variant.sizeId,
          variant.color.value,
          variant.size.value
        );
      }
    }
  }, [
    selectedColor,
    selectedSize,
    item.cartItemId,
    item.variants,
    updateVariant,
  ]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Color</label>
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select a color</option>
          {uniqueColors.map((colorId) => (
            <option key={colorId} value={colorId}>
              {item.variants.find((v) => v.colorId === colorId)?.color.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Size</label>
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          disabled={!selectedColor}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select a size</option>
          {availableSizes.map((sizeId) => (
            <option key={sizeId} value={sizeId}>
              {item.variants.find((v) => v.sizeId === sizeId)?.size.value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
