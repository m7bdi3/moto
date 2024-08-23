import { ProductPage } from "@/components/admin/products/ProductPage";
import db from "@/lib/db";
import { notFound } from "next/navigation";
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
export default async function page({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;

  const productData = await db.product.findUnique({
    where: { id: productId },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          parentId: true,
          parent: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      productImages: {
        select: {
          imageUrl: true,
        },
      },
      user: {
        select: {
          email: true,
        },
      },
      variants: {
        include: {
          color: {
            select: {
              id: true,
              value: true,
              name: true,
            },
          },
          size: {
            select: {
              id: true,
              value: true,
            },
          },
        },
      },
    },
  });

  console.log(productData);

  if (!productData) return notFound();

  const serializedProducts = {
    ...productData,
    price: productData.price.toString(),
    discount: productData.discount ? productData.discount.toString() : null,
  };

  return (
    <ContentLayout title={serializedProducts.name}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <TransitionLink href="/admin">Dashboard</TransitionLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <TransitionLink href="/admin/products">Products</TransitionLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{serializedProducts.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex-col md:min-h-[calc(100vh-160px)] w-full  mt-4 rounded-md">
        <ProductPage product={serializedProducts} />
      </div>
    </ContentLayout>
  );
}
