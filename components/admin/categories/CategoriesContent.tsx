"use client";

import React, { useState } from "react";
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
import { CategoryEditModal } from "@/components/modals/categories/category-edit-modal";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { deleteCategory } from "@/actions/CategoriesActions";
import { toast } from "sonner";

interface Props {
  Categories: {
    id: string;
    name: string;
    userId: string;
    billboardId: string | null;
    createdAt: Date;
    updatedAt: Date;
    parentId: string | null;
    billboard: {
      id: string;
      label: string;
      imageUrl: string;
    } | null;
    children: {
      id: string;
      name: string;
      parentId: string | null;
      billboard: {
        id: string;
        label: string;
        imageUrl: string;
      } | null;
    }[];
    parent: {
      id: string;
      name: string;
      billboard: {
        id: string;
        label: string;
        imageUrl: string;
      } | null;
    }|null;
  }[];
}

export const CategoriesContent = ({ Categories }: Props) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const handleSelectAll = () => {
    if (selectedCategories.length === Categories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(Categories.map((category) => category.id));
    }
  };

  const handleSelect = (id: string) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((catId) => catId !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      for (const categoryId of selectedCategories) {
        await deleteCategory(categoryId);
      }
      setSelectedCategories([]);
    } catch (error) {
      toast.error("An unexpected error occurred while deleting categories.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col h-full">
      {selectedCategories.length > 0 && (
        <div className="w-full flex items-center justify-end">
          <Button
            className="flex items-center gap-2"
            onClick={onDelete}
            disabled={loading}
          >
            <Trash2Icon className="h-4 w-4" />
            Delete Selected
          </Button>
        </div>
      )}
      <div className="w-full p-4">
        <Table>
          <TableCaption>A list of your categories.</TableCaption>
          <TableHeader className="w-full">
            <TableRow>
              <TableHead role="checkbox">
                <Checkbox
                  checked={selectedCategories.length === Categories.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Label</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Billboard</TableHead>
              <TableHead>Parent</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Categories.length > 0 ? (
              Categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell role="checkbox">
                    <Checkbox
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => handleSelect(category.id)}
                    />
                  </TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    {format(new Date(category.createdAt), "P")}
                  </TableCell>
                  <TableCell>{category.billboard?.label}</TableCell>
                  <TableCell>
                    {category.parentId
                      ? category.parent?.name
                      : "---"}
                  </TableCell>
                  <TableCell className="text-right">
                    <CategoryEditModal category={category} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No categories found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
