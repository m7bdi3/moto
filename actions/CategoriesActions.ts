"use server";

import db from "@/lib/db";
import * as z from "zod";
import { auth } from "@/auth";
import { categorySchema } from "@/schemas/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCategory(values: z.infer<typeof categorySchema>) {
  const session = await auth();
  const validatedValues = categorySchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid fields" };
  }

  const { name, billboardId, parentId } = validatedValues.data;
  if (!session?.user?.id) {
    return redirect("/");
  }

  try {
    await db.category.create({
      data: {
        name,
        userId: session.user.id,
        billboardId: billboardId || null,
        parentId: parentId || null,
      },
    });

    revalidatePath("/admin/categories", "layout");
    return { success: "Category created successfully" };
  } catch (error) {
    return { error: "Failed to create category" };
  }
}

export async function editCategory(
  values: z.infer<typeof categorySchema>,
  id: string
) {
  const session = await auth();
  const validatedValues = categorySchema.safeParse(values);

  if (!validatedValues.success) {
    return { error: "Invalid fields" };
  }

  let { name, billboardId, parentId } = validatedValues.data;

  if (parentId === id) parentId = null;

  try {
    await db.category.update({
      where: { id, userId: session?.user.id },
      data: {
        name,
        billboard: {
          connect: { id: billboardId! },
        },
      },
    });

    revalidatePath("/admin/categories", "layout");
    return { success: "Category edited successfully" };
  } catch (error) {
    return { error: "Failed to edit category" };
  }
}

export async function deleteCategory(id: string) {
  const session = await auth();

  try {
    await db.category.delete({
      where: { id, userId: session?.user.id },
    });

    revalidatePath("/admin/categories", "layout");
    return { success: "Category deleted successfully" };
  } catch (error) {
    return { error: "Failed to delete category" };
  }
}
