import { ProductsClient } from "@/components/admin/products/ProductsClient";
import { ProductsContent } from "@/components/admin/products/ProductsContent";
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
export default async function page() {
  
  return (
    <ContentLayout title="Products">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <TransitionLink href="/admin">Dashboard</TransitionLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex-col md:min-h-[calc(100vh-160px)] w-full bg-muted/40 mt-4 rounded-md">
        <ProductsClient />
        <div className=" grid flex-1 bg-card h-full md:m-6 m-4 items-start gap-4 p-4 md:gap-8 border rounded-md relative">
          <ProductsContent />
        </div>
      </div>
    </ContentLayout>
  );
}
