"use server";

import db from "@/lib/db";
import * as z from "zod";
import { auth } from "@/auth";
import { userSchema } from "@/schemas/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function EditUserData(
  values: z.infer<typeof userSchema>,
  id: string
) {
  const session = await auth();
  if (session?.user.id !== id) {
    return { error: "Unauthorized" };
  }

  const validatedValues = userSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid fields" };
  }

  const {
    username,
    phone,
    address1,
    image,
    address2,
    city,
    country,
    zip,
    state,
  } = validatedValues.data;

  try {
    await db.user.update({
      where: {
        id,
      },
      data: {
        name: username,
        image: image,
        phone,
        address1,
        address2,
        city,
        country,
        zip,
        state,
      },
    });
    revalidatePath("/account", "layout");
    return { success: "Profile Data updated successfully" };
  } catch (error) {
    return { error: "Failed to Update" };
  }
}

export async function DeleteUserAccount(id: string) {
  const session = await auth();
  if (session?.user.id !== id) {
    return { error: "Unauthorized" };
  }

  try {
    await db.user.delete({
      where: {
        id,
      },
    });
    redirect("/");
  } catch (error) {
    return { error: "Failed to Delete" };
  }
}
