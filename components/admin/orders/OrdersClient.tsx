"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { FilterIcon, UploadIcon } from "lucide-react";
import React from "react";

export const OrdersClient = () => {
  return (
    <div className="flex items-center justify-between h-fit p-4  w-full bg-card border-b">
      <Heading title={`Orders`} description="Manage your most recent Orders" />
      <div className="flex gap-2">
        <Button className="flex gap-2">
          <UploadIcon className="h-4 w-4" />
          Export
        </Button>
        <Button className="flex gap-2">
          <FilterIcon className="h-4 w-4" />
          Filter
        </Button>
      </div>
      
    </div>
  );
};
