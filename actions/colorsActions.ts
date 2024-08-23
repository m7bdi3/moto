"use server";
import { auth } from "@/auth";
import db from "@/lib/db";
import { ColorSchema } from "@/schemas/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

export async function createColor(values: z.infer<typeof ColorSchema>) {
  const session = await auth();
  const validatedValues = ColorSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid fields" };
  }

  const { name, value } = validatedValues.data;
  if (!session?.user?.id) {
    return redirect("/");
  }

  const alreadyInStore = await db.color.findFirst({
    where: { name, value },
  });

  if (alreadyInStore) {
    return { error: "Color already exists" };
  }

  try {
    await db.color.create({
      data: {
        name,
        value,
      },
    });
    revalidatePath("/admin/colors", "layout");
    return { success: "Color created successfully" };
  } catch (error) {
    return { error: "Failed to create color" };
  }
}

export async function DeleteColor(id: string) {
  try {
    await db.color.delete({
      where: { id },
    });
    revalidatePath("/admin/colors", "layout");
    return { success: "Color deleted successfully" };
  } catch (error) {
    return { error: "Failed to delete color" };
  }
}

