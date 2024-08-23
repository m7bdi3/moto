import React from "react";
import db from "@/lib/db";
import AdminPanelLayout from "@/components/admin/admin-panel-layout";
import InitStore from "@/hooks/store/initStore";

export default async function Adminlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sizes = await db.size.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  const colors = await db.color.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      billboard: {
        select: {
          id: true,
          label: true,
          imageUrl: true,
        },
      },
      children: {
        select: {
          id: true,
          parentId: true,
          name: true,
          billboard: {
            select: {
              id: true,
              label: true,
              imageUrl: true,
            },
          },
        },
      },
      parent: {
        select: {
          id: true,
          name: true,
          billboard: {
            select: {
              id: true,
              label: true,
              imageUrl: true,
            },
          },
        },
      },
    },
  });

  const Products = await db.product.findMany({
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
    orderBy: {
      createdAt: "desc",
    },
  });

  const serializedProducts = Products.map((product) => ({
    ...product,
    price: product.price.toString(),
    discount: product.discount?.toString() || null,
  }));

  return (
    <>
      <AdminPanelLayout>{children}</AdminPanelLayout>
      <InitStore
        colors={colors}
        sizes={sizes}
        Categories={categories}
        products={serializedProducts}
      />
    </>
  );
}
