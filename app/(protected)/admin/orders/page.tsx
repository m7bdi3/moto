import { OrdersClient } from "@/components/admin/orders/OrdersClient";
import { OrdersContent } from "@/components/admin/orders/OrdersContent";
import db from "@/lib/db";
import React from "react";
import { ContentLayout } from "@/components/admin/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { TransitionLink } from "@/components/LinkTransition";
export default async function OrdersPage() {
  const orders = await db.order.findMany({
    include: {
      orderItems: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              sku: true,
            },
          },
        },
      },
    },
    where: {
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <ContentLayout title="Orders">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <TransitionLink href="/admin">Dashboard</TransitionLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Orders</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex-col md:min-h-[calc(100vh-160px)] w-full bg-muted/40 mt-4 rounded-md">
        <OrdersClient />
        <div className=" grid flex-1 bg-card h-full md:m-6 m-4 items-start gap-4 p-4 md:gap-8 border rounded-md relative">
          <OrdersContent orders={orders} />
        </div>
      </div>
    </ContentLayout>
  );
}
