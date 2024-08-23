"use server";

import { auth } from "@/auth";
import db from "@/lib/db";

export async function DeleteUser(id: string) {
  const session = await auth();

  if (!session) {
    throw new Error("Unothourized");
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (user?.role === "ADMIN") {
    await db.user.delete({
      where: {
        id,
      },
    });
  }
}

export async function getAllusers() {
  return await db.user.findMany();
}
