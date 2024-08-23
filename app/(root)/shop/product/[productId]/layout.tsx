import InitStore from "@/hooks/store/initStore";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  children: React.ReactNode;
  params: {
    productId: string;
  };
}

export default async function Productlayout({ children, params }: Props) {
  const { productId } = params;

  const Product = await db.product.findUnique({
    where: { id: productId },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          parentId: true,
          parent: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      productImages: {
        select: {
          imageUrl: true,
        },
      },
      user: {
        select: {
          email: true,
        },
      },
      variants: {
        include: {
          color: {
            select: {
              id: true,
              value: true,
              name: true,
            },
          },
          size: {
            select: {
              id: true,
              value: true,
            },
          },
        },
      },
    },
  });
  if (!Product) return notFound();

  const serializedProducts = {
    ...Product,
    price: Product.price.toString(),
  };

  return (
    <>
      {children}
      <InitStore Product={serializedProducts} />
    </>
  );
}
