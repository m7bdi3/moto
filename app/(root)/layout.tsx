import { auth } from "@/auth";
import { Footer } from "@/components/Main/Footer";
import { Header } from "@/components/Main/Header";
import InitFav from "@/hooks/store/initFav";
import InitStore from "@/hooks/store/initStore";
import db from "@/lib/db";
import React, { Suspense } from "react";
import { Loading } from "./favorites/page";

interface Props {
  children: React.ReactNode;
}

export default async function MainPagelayout({ children }: Props) {
  const session = await auth();
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

  const favProducts = await db.favorite.findMany({
    where: {
      userId: session?.user.id,
    },
    select: {
      productId: true,
    },
  });

  const transformedFavorites: Record<string, Set<string>> = {
    [session?.user.id || ""]: new Set(favProducts.map((fav) => fav.productId)),
  };

  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>{children}</Suspense>
      <InitStore
        colors={colors}
        sizes={sizes}
        Categories={categories}
        products={serializedProducts}
      />
      <InitFav favorites={transformedFavorites} />
      <Footer />
    </>
  );
}
