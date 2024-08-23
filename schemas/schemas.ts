import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(3).max(50),
});

export const billboardSchema = z.object({
  label: z.string().min(3).max(50),
  imageUrl: z.string().min(3),
});

export const categorySchema = z.object({
  name: z.string().min(3).max(50),
  billboardId: z.string().min(2).nullable(),
  parentId: z.string().nullable(),
});

const Decimal = z
  .string()
  .regex(/^\d+(\.\d+)?$/, "Must be a valid decimal")
  .min(1);

export const ProductSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters long" }),
  price: z.string(),
  isFeatured: z.boolean().default(false),
  isArchived: z.boolean().default(false),
  weight: z.string().min(2),
  categoryId: z
    .string()
    .min(1, { message: "Category ID must be at least 1 character long" }),
  images: z
    .array(z.string().url({ message: "Each image must be a valid URL" }))
    .min(1, { message: "At least one image is required" }),
  discount: z.number().nullable(),
  variants: z.array(
    z.object({
      colorId: z.string().min(1),
      sizeId: z.string().min(1),
      stock: z.number().min(1),
      price: z.string(),
    })
  ),
});

export const ProductFormSchema = ProductSchema.extend({
  colorSizes: z.array(
    z.object({
      colorId: z.string().min(1),
      sizes: z.array(
        z.object({
          sizeId: z.string().min(1),
          stock: z.number().min(1),
          price: z.string().min(1),
        })
      ),
    })
  ),
}).omit({ variants: true });

export const ColorSchema = z.object({
  name: z.string().min(2),
  value: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex code"),
});

export const SizeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  value: z.string().min(1, "Value is required"),
  type: z.enum(["APPAREL", "SHOES"]),
});

export const userSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters long")
    .max(30, "Username can be at most 30 characters long"),
  image: z.string().url(),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be a 10-digit number"),
  address1: z.string().min(1, "Address must be at least 1 character long"),
  address2: z.string().nullable(),
  city: z.string().min(1, "City must be at least 1 character long"),
  state: z.string().min(1, "State must be at least 1 character long"),
  zip: z.string().min(1, "Zip code must be at least 1 character long"),
  country: z.string().min(1, "Country must be at least 1 character long"),
});
