"use client";

import { Color } from "@prisma/client";
import { format } from "date-fns";
import { useModalStore } from "@/hooks/store/use-store-modal";

import { Trash2Icon } from "lucide-react";
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

interface Props {
  colors: Color[];
}

export const ColorsContent = ({ colors }: Props) => {
  const { openColorAlert } = useModalStore();
  return (
    <div className="w-full flex flex-col gap-4 ">
      <Table>
        <TableCaption>A list of your Colors.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead role="checkbox">
              <Checkbox />
            </TableHead>
            <TableHead className="w-[100px]">Color</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {colors.map((color, index) => (
            <TableRow key={index}>
              <TableCell role="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium">
                <div
                  className="h-10 w-10 rounded-full border-2 border-yellow-600"
                  style={{ backgroundColor: color.value }}
                />
              </TableCell>
              <TableCell>{color.name}</TableCell>
              <TableCell>{color.value}</TableCell>
              <TableCell>{format(color.createdAt, "PPpp")}</TableCell>
              <TableCell className="text-right">
                <Button
                  size={"icon"}
                  variant={"destructive"}
                  onClick={() => {
                    openColorAlert(color.id);
                  }}
                >
                  <Trash2Icon className="w-5 h-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
