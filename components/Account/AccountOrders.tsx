import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import Image from "next/image";

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: {
    name: string;
    price: number;
    productImages: {
      imageUrl: string;
    }[];
  };
}

interface Order {
  id: string;
  isPaid: boolean;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  totalPrice: number;
  orderItems: OrderItem[];
}

interface Props {
  orders: Order[];
}

export default function AccountOrders({ orders }: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>View your recent orders.</CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length > 0 ? (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-8">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <p className="text-center text-muted-foreground">
            You haven&apos;t made any orders yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function OrderCard({ order }: { order: Order }) {
  const totalPrice = Number(order.totalPrice).toFixed(2);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Order #{order.id}</h3>
          <p className="text-sm text-muted-foreground">
            {format(order.createdAt, "PPP")}
          </p>
        </div>
        <Badge variant={order.isPaid ? "default" : "secondary"}>
          {order.isPaid ? "Paid" : "Canceled"}
        </Badge>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {order.orderItems.map((item) => (
          <OrderItemCard key={item.id} item={item} />
        ))}
      </div>
      <div className="flex items-center justify-between space-x-4">
        <p className="text-sm text-muted-foreground">Total:</p>
        <p className="font-semibold">${totalPrice}</p>
      </div>
    </div>
  );
}

function OrderItemCard({ item }: { item: OrderItem }) {
  return (
    <div className="flex items-center space-x-4 rounded-lg border p-3">
      <div className="relative h-16 w-16 overflow-hidden rounded-md">
        <Image
          src={item.product.productImages[0].imageUrl}
          alt={item.product.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex-1 space-y-1">
        <h4 className="font-medium">{item.product.name}</h4>
        <p className="text-sm text-muted-foreground">${item.product.price}</p>
      </div>
    </div>
  );
}
