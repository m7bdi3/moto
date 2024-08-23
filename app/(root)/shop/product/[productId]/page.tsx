import db from "@/lib/db";
import React from "react";
import { ProductPage } from "../../_components/ProductPage";
import { notFound } from "next/navigation";

interface Props {
  params: {
    productId: string;
  };
}

export default async function Productpage({ params }: Props) {
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

  const category = await db.category.findUnique({
    where: { id: Product.categoryId },
    include: {
      products: {
        select: {
          id: true,
          name: true,
          categoryId: true,
          description: true,
          isArchived: true,
          isFeatured: true,
          productImages: {
            select: {
              imageUrl: true,
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
      },
      parent: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!category) return notFound();

  return <ProductPage product={serializedProducts} category={category} />;
}
