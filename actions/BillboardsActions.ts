"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { billboardSchema } from "@/schemas/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

export async function createBillboard(values: z.infer<typeof billboardSchema>) {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/");
  }

  const validatedValues = billboardSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid fields" };
  }
  const { label, imageUrl } = validatedValues.data;

  const existingBillboard = await db.billboard.findFirst({
    where: { label, userId: session.user.id },
  });

  if (existingBillboard) {
    return { error: "Billboard name already exists" };
  }

  try {
    await db.billboard.create({
      data: { label, userId: session.user.id, imageUrl },
    });
    revalidatePath("/admin/billboards", "layout");
    return { success: "Billboard created successfully" };
  } catch {
    return { error: "Failed to create Billboard" };
  }
}

export async function editBillboard(
  values: z.infer<typeof billboardSchema>,
  id: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/");
  }

  const validatedValues = billboardSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid fields" };
  }
  const { label, imageUrl } = validatedValues.data;

  try {
    await db.billboard.update({
      where: { id, userId: session.user.id },
      data: { label, imageUrl },
    });
    revalidatePath("/admin/billboards", "layout");
    return { success: "Billboard edited successfully" };
  } catch {
    return { error: "Failed to edit Billboard" };
  }
}

export async function deleteBillboard(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/");
  }

  try {
    await db.billboard.delete({
      where: { id, userId: session.user.id },
    });
    revalidatePath("/admin/billboards", "layout");
    return { success: "Billboard deleted successfully" };
  } catch {
    return { error: "Failed to delete Billboard" };
  }
}

export const getBillboards = async () => {
  return await db.billboard.findMany();
};
