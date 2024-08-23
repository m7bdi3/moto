import db from "@/lib/db";

import { CategoriesClient } from "@/components/admin/categories/CategoriesClient";
import { CategoriesContent } from "@/components/admin/categories/CategoriesContent";
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
export default async function page() {
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      billboard: {
        select: {
          id: true,
          label: true,
          imageUrl: true,
        },
      },
      children: {
        select: {
          id: true,
          parentId: true,
          name: true,
          billboard: {
            select: {
              id: true,
              label: true,
              imageUrl: true,
            },
          },
        },
      },
      parent: {
        select: {
          id: true,
          name: true,
          billboard: {
            select: {
              id: true,
              label: true,
              imageUrl: true,
            },
          },
        },
      },
    },
  });

  return (
    <ContentLayout title="Categories">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <TransitionLink href="/admin">Dashboard</TransitionLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Categories</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex-col md:min-h-[calc(100vh-160px)] w-full bg-muted/40 mt-4 rounded-md">
        <CategoriesClient />
        <div className=" grid flex-1 bg-card h-full md:m-6 m-4 items-start gap-4 p-4 md:gap-8 border rounded-md relative">
          <CategoriesContent Categories={categories} />
        </div>
      </div>
    </ContentLayout>
  );
}
