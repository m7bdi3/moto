import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
  {
    apiVersion: "2024-06-20",
    typescript: true,
  }
);
