"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { useModalStore } from "@/hooks/store/use-store-modal";
import { PlusCircle } from "lucide-react";
import React from "react";

export const BillboardClient = ({ number }: { number: number }) => {
  const { openBillboard } = useModalStore();
  return (
    <div className="flex items-center justify-between h-fit p-4  w-full bg-card border-b">
      <Heading
        title={`Billboards (${number})`}
        description="Manage billboards"
      />

      <Button onClick={openBillboard} className="flex gap-2">
        <PlusCircle className="h-4 w-4" />
        Add new
      </Button>
    </div>
  );
};
