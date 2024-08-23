import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import db from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("Stripe-signature");

  if (!signature) {
    return new NextResponse("Missing Stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session.customer_details?.address;

  const addressString = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ]
    .filter((c) => !!c)
    .join(", ");

  if (event.type === "checkout.session.completed") {
    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      const order = await db.order.update({
        where: {
          id: session.metadata?.orderId,
        },
        data: {
          isPaid: true,
          address: addressString,
          phone: session.customer_details?.phone || "",
          totalPrice: session.amount_total! / 100,
        },
        include: {
          orderItems: true,
        },
      });

      const productIds = session.metadata?.productId.split(",") || [];

      // Update stock for each order item
      await Promise.all(
        order.orderItems.map(async (orderItem) => {
          if (productIds.includes(orderItem.productId)) {
            const { productId, colorId, sizeId, quantity } = orderItem;

            console.log(`Updating stock for Product ID: ${productId}, Color ID: ${colorId}, Size ID: ${sizeId}, Quantity: ${quantity}`);

            // Validate that quantity is present and a number
            if (colorId && sizeId && quantity && quantity > 0) {
              const result = await db.productVariant.updateMany({
                where: {
                  productId,
                  colorId,
                  sizeId,
                },
                data: {
                  stock: {
                    decrement: quantity,
                  },
                },
              });

              console.log(`Stock update result: ${JSON.stringify(result)}`);
            } else {
              console.warn(`Invalid order item details: ${JSON.stringify(orderItem)}`);
            }
          }
        })
      );
    } catch (error: any) {
      console.error("Order update failed", error);
      return new NextResponse("Order update failed", { status: 500 });
    }
  }

  return new NextResponse(null, { status: 200 });
}
