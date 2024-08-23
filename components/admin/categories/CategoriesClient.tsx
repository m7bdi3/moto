"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { useModalStore } from "@/hooks/store/use-store-modal";
import { PlusCircle } from "lucide-react";

export const CategoriesClient = () => {
  const { openCategory } = useModalStore();

  return (
    <div className="flex items-center justify-between h-fit p-4  w-full bg-card border-b">
      <Heading title="Categories" description="Manage Categories" />
      <Button
        className="flex gap-2"
        onClick={() => {
          openCategory();
        }}
      >
        <PlusCircle className="h-4 w-4" />
        Add new
      </Button>
    </div>
  );
};
