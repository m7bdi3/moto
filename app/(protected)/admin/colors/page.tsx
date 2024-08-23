import React from "react";
import db from "@/lib/db";

import { ColorsClient } from "@/components/admin/colors/ColorsClient";
import { ColorsContent } from "@/components/admin/colors/ColorsContent";
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
  const colors = await db.color.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <ContentLayout title="colors">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <TransitionLink href="/admin">Dashboard</TransitionLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Colors</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex-col md:min-h-[calc(100vh-160px)] w-full bg-muted/40 mt-4 rounded-md">
        <ColorsClient />
        <div className=" grid flex-1 bg-card h-full md:m-6 m-4 items-start gap-4 p-4 md:gap-8 border rounded-md relative">
          <ColorsContent colors={colors} />
        </div>
      </div>
    </ContentLayout>
  );
}
