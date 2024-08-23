"use client";

import { format } from "date-fns";

import {
  Table,
  TableCaption,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { OrdersWithProducts } from "@/types";
import { Badge } from "@/components/ui/badge";

interface Props {
  orders: OrdersWithProducts[];
}

export const OrdersContent = ({ orders }: Props) => {
  return (
    <div className="w-full flex flex-col gap-4 ">
      <Table>
        <TableCaption>A list of your orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead role="checkbox">
              <Checkbox />
            </TableHead>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-xs">
          {orders.map((order) => {
            // Calculate the total price for this order
            const totalPrice = order.orderItems.reduce((total, item) => {
              return total + Number(item.product.price);
            }, 0);

            return (
              <TableRow key={order.id}>
                <TableCell role="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell className="text-xs">
                  {order.orderItems.map((item) => item.product.name).join(", ")}
                </TableCell>
                <TableCell>${totalPrice.toFixed(2)}</TableCell>
                <TableCell>
                  {order.isPaid ? (
                    <Badge className="bg-emerald-600 h-4 w-4 rounded-full p-0 place-self-center" />
                  ) : (
                    <Badge className="bg-destructive h-4 w-4 rounded-full" />
                  )}
                </TableCell>
                <TableCell>{format(new Date(order.createdAt), "Pp")}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
