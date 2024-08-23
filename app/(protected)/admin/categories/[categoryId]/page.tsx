import { CategoryPage } from "@/components/admin/categories/CategoryPage";
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
  params: { categoryId: string };
}) {
  const category = await db.category.findUnique({
    where: { id: params.categoryId },
    include: {
      products: {
        include: {
          productImages: {
            select: {
              imageUrl: true,
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
      },
      billboard: true,
    },
  });
  if (!category) {
    return notFound();
  }
  return (
    <ContentLayout title={category.name}>
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
              <TransitionLink href="/admin/categories">
                Categories
              </TransitionLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{category.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex-col md:min-h-[calc(100vh-160px)] w-full bg-muted/40 mt-4 rounded-md">
        <CategoryPage products={category as any} />
      </div>
    </ContentLayout>
  );
}
