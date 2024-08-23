"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useStore } from "@/hooks/store/use-store";

export const ProductsClient = () => {
  const router = useRouter();
  const { products } = useStore();
  return (
    <div className="flex items-center justify-between h-fit p-4 w-full border-b bg-background">
      <Heading
        title={`Products (${products?.length})`}
        description="Manage Products created by you"
      />
      <Button
        className="flex gap-2"
        onClick={() => {
          router.push("/admin/products/new");
        }}
      >
        <PlusCircle className="h-4 w-4" />
        Add new
      </Button>
    </div>
  );
};
