"use server";

import { auth } from "@/auth";
import { CartItem } from "@/hooks/store/use-cart-store";
import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { Decimal } from "@prisma/client/runtime/library";
import Stripe from "stripe";

interface Props {
  items: CartItem[];
}

export const createStripeUrl = async ({ items }: Props) => {
  const session = await auth();

  if (!session?.user.id || !session) {
    throw new Error("Unauthorized");
  }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  items.forEach((item) => {
    line_items.push({
      quantity: item.quantity,
      tax_rates: ["txr_1PpwO7CYUxjzdX9cgXZEKhA0"],
      price_data: {
        currency: "USD",
        product_data: {
          name: item.name,
          images: item.productImages.map((image) => image.imageUrl),
          description: `Color: ${item.selectedVariant.colorValue}, Size: ${item.selectedVariant.sizeValue}`,
        },
        unit_amount: Math.round(Number(item.price) * 100),
      },
    });
  });

  const totalPrice = items.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  const order = await db.order.create({
    data: {
      isPaid: false,
      totalPrice: new Decimal(totalPrice.toPrecision(4)),
      orderItems: {
        create: items.map((item) => ({
          productId: item.id,
          colorId: item.selectedVariant.colorId || "",
          sizeId: item.selectedVariant.sizeId || "",
          quantity: item.quantity,
          price: item.price,
        })),
      },
      userId: session?.user.id!,
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    shipping_options: [
      {
        shipping_rate: "shr_1Ppw22CYUxjzdX9cwI1ifuZG",
      },
    ],

    success_url: `${process.env.NEXT_PUBLIC_APP_URL as string}/cart?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL as string}/cart?canceled=1`,
    metadata: {
      orderId: order.id,
      sizeId: items.map((item) => item.selectedVariant.sizeId).join(","),
      colorId: items.map((item) => item.selectedVariant.colorId).join(","),
      productId: items.map((item) => item.id).join(","),
    },
  });

  return { data: stripeSession.url };
};
