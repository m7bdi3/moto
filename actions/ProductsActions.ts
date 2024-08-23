"use server";

import db from "@/lib/db";
import * as z from "zod";
import { auth } from "@/auth";
import { ProductSchema } from "@/schemas/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Decimal } from "@prisma/client/runtime/library";

function generateSKU(name: string, categoryId: string, categoryName: string) {
  const namePart = name.substring(0, 3).toUpperCase();
  const categoryPart = categoryId.substring(0, 3).toUpperCase();
  const categoryNamePart = categoryName.substring(0, 4).toUpperCase();
  return `${namePart}-${categoryNamePart}-${categoryPart}`;
}

export async function createProduct(values: z.infer<typeof ProductSchema>) {
  const session = await auth();
  const validatedValues = ProductSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid fields" };
  }

  const {
    name,
    description,
    price,
    isArchived,
    isFeatured,
    weight,
    categoryId,
    images,
    variants,
    discount,
  } = validatedValues.data;

  if (!session?.user?.id) {
    return redirect("/");
  }

  const category = await db.category.findUnique({
    where: { id: categoryId },
    include: {
      parent: true,
    },
  });

  if (!category) {
    return { error: "Category not found" };
  }

  const sku = generateSKU(name, category.id, category.name);

  const alreadyInStore = await db.product.findFirst({
    where: { name, sku },
  });

  if (alreadyInStore) {
    return { error: "Product already exists" };
  }

  try {
    await db.product.create({
      data: {
        name,
        description,
        price: new Decimal(price),
        isFeatured,
        isArchived,
        weightValue: weight,
        userId: session.user.id! as string,
        sku,
        discount: discount !== null ? new Decimal(discount) : 0,
        categoryId,
        variants: {
          create: variants.map((variant) => ({
            colorId: variant.colorId,
            sizeId: variant.sizeId,
            stock: variant.stock,
            price: new Decimal(variant.price),
          })),
        },
        productImages: { create: images.map((url) => ({ imageUrl: url })) },
      },
    });

    revalidatePath("/admin/products", "layout");
    return { success: "Product created successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create Product" };
  }
}

export async function editProduct(
  values: z.infer<typeof ProductSchema>,
  id: string
) {
  const session = await auth();
  const validatedValues = ProductSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid fields" };
  }

  const {
    name,
    description,
    price,
    isArchived,
    isFeatured,
    weight,
    categoryId,
    images,
    variants,
  } = validatedValues.data;

  try {
    await db.$transaction(async (prisma) => {
      const product = await prisma.product.update({
        where: { id, userId: session?.user.id },
        data: {
          name,
          description,
          price: new Decimal(price),
          isFeatured,
          isArchived,
          weightValue: weight,
          categoryId,
        },
      });

      await prisma.productImages.deleteMany({
        where: { productId: id },
      });

      const productImages = await Promise.all(
        images.map((imageUrl) =>
          prisma.productImages.create({
            data: {
              productId: id,
              imageUrl,
            },
          })
        )
      );

      // Delete existing variants that are not in the new list
      const existingVariants = await prisma.productVariant.findMany({
        where: { productId: id },
      });

      const newVariantIds = variants.map((v) => `${v.colorId}-${v.sizeId}`);
      const variantsToDelete = existingVariants.filter(
        (v) => !newVariantIds.includes(`${v.colorId}-${v.sizeId}`)
      );

      await prisma.productVariant.deleteMany({
        where: {
          id: {
            in: variantsToDelete.map((v) => v.id),
          },
        },
      });

      // Create or update variants
      await Promise.all(
        variants.map(async (variant) => {
          const existingVariant = existingVariants.find(
            (v) => v.colorId === variant.colorId && v.sizeId === variant.sizeId
          );

          if (existingVariant) {
            await prisma.productVariant.update({
              where: { id: existingVariant.id },
              data: {
                stock: variant.stock,
                price: new Decimal(variant.price),
              },
            });
          } else {
            await prisma.productVariant.create({
              data: {
                productId: id,
                colorId: variant.colorId,
                sizeId: variant.sizeId,
                stock: variant.stock,
                price: new Decimal(variant.price),
              },
            });
          }
        })
      );

      return {
        product,
        productImages,
      };
    });
    revalidatePath("/admin/products", "layout");
    return { success: "Product edited successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to edit Product" };
  }
}

export async function deleteProduct(id: string) {
  const session = await auth();
  try {
    await db.product.delete({
      where: { id: id, userId: session?.user.id },
    });
    revalidatePath("/admin/products", "layout");
    return { success: "Product deleted successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Failed to delete Product" };
  }
}
