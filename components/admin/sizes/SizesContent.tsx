"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { useModalStore } from "@/hooks/store/use-store-modal";
import { Size } from "@prisma/client";

import {
  Table,
  TableCaption,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash2Icon, MoreHorizontal, PencilIcon } from "lucide-react";

interface Props {
  sizes: Size[];
}

export const SizesContent = ({ sizes }: Props) => {
  const { openSizeAlert, openSize } = useModalStore();
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const handleSelectAll = () => {
    if (selectedSizes.length === sizes.length) {
      setSelectedSizes([]);
    } else {
      setSelectedSizes(sizes.map((size) => size.id));
    }
  };

  const handleSelect = (id: string) => {
    setSelectedSizes((prev) =>
      prev.includes(id) ? prev.filter((sizeId) => sizeId !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      {selectedSizes.length > 0 && (
        <div className="flex justify-between items-center bg-muted p-2 rounded-md">
          <p className="text-sm text-muted-foreground">
            {selectedSizes.length}{" "}
            {selectedSizes.length === 1 ? "size" : "sizes"} selected
          </p>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              selectedSizes.forEach((id) => openSizeAlert(id));
              setSelectedSizes([]);
            }}
          >
            <Trash2Icon className="h-4 w-4 mr-2" />
            Delete Selected
          </Button>
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableCaption>A list of your sizes.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedSizes.length === sizes.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sizes.map((size) => (
              <TableRow key={size.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedSizes.includes(size.id)}
                    onCheckedChange={() => handleSelect(size.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{size.name}</TableCell>
                <TableCell>{size.value}</TableCell>
                <TableCell>
                  <Badge
                    variant={size.type === "APPAREL" ? "default" : "secondary"}
                  >
                    {size.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => openSize()}>
                        <PencilIcon className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => openSizeAlert(size.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2Icon className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
