import React, { Suspense } from "react";
import { getAllusers } from "@/actions/adminActions";
import { ContentLayout } from "@/components/admin/content-layout";
import { TransitionLink } from "@/components/LinkTransition";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { UsersComponent } from "./_componet/users";
import { Loading } from "@/app/(root)/favorites/page";

export default async function SettingsPage() {
  const users = await getAllusers();

  if (users.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-xl text-gray-600">No users found.</div>
      </div>
    );
  }

  return (
    <ContentLayout title="Settings">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <TransitionLink href="/admin">Dashboard</TransitionLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Suspense fallback={<Loading />}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
          <UsersComponent users={users} />
        </div>
      </Suspense>
    </ContentLayout>
  );
}
