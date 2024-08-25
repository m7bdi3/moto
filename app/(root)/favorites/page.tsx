import { auth } from "@/auth";
import ProductCard from "@/components/ProductCard";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { HeartIcon, Loader, Loader2Icon } from "lucide-react";

export const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <Loader2Icon className="h-16 w-16 animate-spin" />
  </div>
);

const Error = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center h-screen">
    <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
    <p className="text-red-500">{message}</p>
  </div>
);

const Favorites = async () => {
  const session = await auth();
  if (!session) return redirect("/login");

  try {
    const favorites = await db.favorite.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        product: {
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
        },
      },
    });

    if (favorites.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <HeartIcon className="w-16 h-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">No favorites yet</h2>
          <p className="text-gray-600">
            Start adding some products to your favorites!
          </p>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8 h-screen">
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-3xl font-bold ">Your Favorites</h1>
          <HeartIcon className="h-8 w-8 fill-primary" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center ">
          {favorites.map((fav) => (
            <ProductCard key={fav.product.id} product={fav.product} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch favorites:", error);
    return (
      <Error message="Failed to load favorites. Please try again later." />
    );
  }
};

// Main page component
export default function FavoritesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Favorites />
    </Suspense>
  );
}
