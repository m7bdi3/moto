"use server";
import { auth } from "@/auth";
import db from "@/lib/db";
import { SizeSchema } from "@/schemas/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

export async function createSize(values: z.infer<typeof SizeSchema>) {
  const session = await auth();
  const validatedValues = SizeSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid fields" };
  }

  const { name, value, type } = validatedValues.data;
  if (!session?.user?.id) {
    return redirect("/");
  }

  const alreadyInStore = await db.size.findFirst({
    where: { name, value },
  });

  if (alreadyInStore) {
    return { error: "size already exists" };
  }

  try {
    await db.size.create({
      data: {
        name,
        value,
        type,
      },
    });
    revalidatePath("/admin/sizes", "layout");
    return { success: "size created successfully" };
  } catch (error) {
    return { error: "Failed to create size" };
  }
}

export async function Deletesize(id: string) {
  try {
    await db.size.delete({
      where: { id },
    });
    revalidatePath("/admin/sizes", "layout");
    return { success: "size deleted successfully" };
  } catch (error) {
    return { error: "Failed to delete size" };
  }
}
