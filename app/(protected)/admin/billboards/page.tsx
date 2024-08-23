import React from "react";

import { BillboardClient } from "@/components/admin/billboards/BillboardClient";
import db from "@/lib/db";
import { BillboardContent } from "@/components/admin/billboards/BillboardContent";
import { auth } from "@/auth";
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
  const session = await auth();
  const billboards = await db.billboard.findMany({
    where: { userId: session?.user.id },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <ContentLayout title="Billboards">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <TransitionLink href="/admin">Dashboard</TransitionLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Billboards</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex-col md:min-h-[calc(100vh-160px)] w-full bg-muted/40 mt-4 rounded-md">
        <BillboardClient number={billboards.length} />
        <div className=" grid flex-1 bg-card h-full md:m-6 m-4 items-start gap-4 p-4 md:gap-8 border rounded-md relative">
          <BillboardContent billboards={billboards} />
        </div>
      </div>
    </ContentLayout>
  );
}
