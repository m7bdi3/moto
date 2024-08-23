"use server";

import { auth } from "@/auth";
import db from "@/lib/db";

interface Props {
  id: string;
}

export async function addFavorite(id: string) {
  const user = await auth();
  if (!user) {
    throw new Error("User not found");
  }

  await db.favorite.create({
    data: {
      userId: user.user.id,
      productId: id,
    },
  });
}

export async function deleteFavorite(id: string) {
  const user = await auth();
  if (!user) {
    throw new Error("User not found");
  }

  await db.favorite.delete({
    where: {
      userId: user.user.id,
      productId: id,
    },
  });
}
