"use client";
import React from "react";
import { useModalStore } from "@/hooks/store/use-store-modal";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { PlusCircle } from "lucide-react";

export const SizesClient = () => {
  const { openSize } = useModalStore();
  return (
    <div className="flex items-center justify-between h-fit p-4  w-full bg-card border-b">
      <Heading title={`Sizes`} description="Manage sizes" />

      <Button onClick={openSize} className="flex gap-2">
        <PlusCircle className="h-4 w-4" />
        Add new
      </Button>
    </div>
  );
};
