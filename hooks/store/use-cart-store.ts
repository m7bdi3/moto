import { ProductsWithCategoryAndUser } from "@/types";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem extends ProductsWithCategoryAndUser {
  cartItemId: string;
  quantity: number;
  selectedVariant: {
    colorId: string | null;
    colorValue: string | null;
    sizeId: string | null;
    sizeValue: string | null;
    price: number | null;
  };
}

interface CartStore {
  items: CartItem[];
  addItem: (data: ProductsWithCategoryAndUser) => void;
  updateVariant: (
    cartItemId: string,
    colorId: string,
    sizeId: string,
    colorValue: string,
    sizeValue: string
  ) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  removeItem: (cartItemId: string) => void;
  removeAll: () => void;
}

export const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: ProductsWithCategoryAndUser) => {
        const currentItems = get().items;
        const cartItemId = `${data.id}-${Date.now()}`;
        set({
          items: [
            ...currentItems,
            {
              ...data,
              cartItemId,
              quantity: 1,
              selectedVariant: {
                colorId: null,
                sizeId: null,
                colorValue: null,
                sizeValue: null,
                price: null,
              },
            },
          ],
        });
        toast.success("Item added to cart");
      },

      updateVariant: (
        cartItemId: string,
        colorId: string,
        sizeId: string,
        colorValue: string,
        sizeValue: string
      ) => {
        const updatedItems = get().items.map((item) => {
          if (item.cartItemId === cartItemId) {
            const selectedVariant = item.variants.find(
              (v) => v.colorId === colorId && v.sizeId === sizeId
            );
            const price = selectedVariant?.price || item.price;

            return {
              ...item,
              selectedVariant: {
                colorId,
                sizeId,
                colorValue,
                sizeValue,
                price,
              },
            };
          }
          return item;
        });
        set({ items: updatedItems });
      },

      updateQuantity: (cartItemId: string, quantity: number) => {
        const updatedItems = get().items.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
        );
        set({ items: updatedItems });
      },

      removeItem: (cartItemId: string) => {
        set({
          items: get().items.filter((item) => item.cartItemId !== cartItemId),
        });
        toast.success("Item removed from cart");
      },

      removeAll: () => {
        set({ items: [] });
        toast.success("Cart cleared");
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
