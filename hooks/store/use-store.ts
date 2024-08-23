import {
  CategoryPageWithProducts,
  CategoryWithBillboardAndUser,
  ProductsWithCategoryAndUser,
} from "@/types";
import { Color, Size } from "@prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface storeState {
  Categories?: CategoryWithBillboardAndUser[];
  Category?: CategoryPageWithProducts;
  products?: ProductsWithCategoryAndUser[];
  Product?: ProductsWithCategoryAndUser;
  sizes?: Size[];
  colors?: Color[];
}

export const useStore = create(
  persist<storeState>(
    () => ({
      Categories: [],
      Category: {
        id: "",
        name: "",
        userId: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        billboardId: "",
        billboard: {
          id: "",
          userId: "",
          label: "",
          imageUrl: "",
          categoryId: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        products: [],
        children: [],
        parent: null,
      },
      products: [],
      Product: {
        id: "",
        name: "",
        description: "",
        price: 0,
        discount: 0,
        isArchived: false,
        isFeatured: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        sku: "",
        weightValue: "",
        userId: "",
        categoryId: "",

        productImages: [],
        variants: [],
        user: {
          email: "",
        },
        category: {
          id: "",
          name: "",
          parentId: null,
          parent: null,
        },
        color: {
          id: "",
          name: "",
          value: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        size: {
          id: "",
          name: "",
          value: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      sizes: [],
      colors: [],
    }),
    {
      name: "Moto-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
