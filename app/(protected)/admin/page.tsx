import React from "react";
import { ContentLayout } from "@/components/admin/content-layout";
import DashboardMain from "@/components/admin/DashboardMain";
export default async function page() {
  return (
    <ContentLayout title="Dashboard">
      <DashboardMain />
    </ContentLayout>
  );
}
