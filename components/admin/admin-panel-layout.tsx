"use client";

import { cn } from "@/lib/utils";
import { Sidebar } from "./sidebar";
import { useSidebarStore } from "@/hooks/store/use-sidebar-store";
import { useSidebarToggle } from "@/hooks/store/use-sidebar-toggle";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebar = useSidebarStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh-70px)] transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        {children}
      </main>
    </>
  );
}
