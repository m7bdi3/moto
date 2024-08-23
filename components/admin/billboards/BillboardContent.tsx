"use client";

import React from "react";
import Image from "next/image";
import { Billboard } from "@prisma/client";
import { format } from "date-fns";
import {
  Table,
  TableCaption,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { BillboardEditModal } from "@/components/modals/billboards/billboard-edit-modal";

interface Props {
  billboards: Billboard[];
}

export const BillboardContent = ({ billboards }: Props) => {
  return (
    <div className="w-full flex flex-col gap-4 h-full">
      <Table>
        <TableCaption>A list of your Billboards.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead role="checkbox">
              <Checkbox />
            </TableHead>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Label</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {billboards.length > 0 ? (
            billboards.map((billboard, index) => (
              <TableRow key={index}>
                <TableCell role="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium">
                  <Image
                    width={80}
                    height={40}
                    src={billboard.imageUrl}
                    alt={billboard.label}
                    className="object-cover rounded-md"
                  />
                </TableCell>
                <TableCell>{billboard.label}</TableCell>
                <TableCell>{format(billboard.createdAt, "PPpp")}</TableCell>
                <TableCell className="text-right">
                  <BillboardEditModal billboard={billboard} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
