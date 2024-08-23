"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { toast } from "sonner";
import { useStore } from "@/hooks/store/use-store";
import { deleteProduct } from "@/actions/ProductsActions";

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
import { Button } from "@/components/ui/button";
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

export const ProductsContent = () => {
  const { products } = useStore();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSelectAll = () => {
    if (selectedProducts.length === products?.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products!.map((product) => product.id));
    }
  };

  const handleSelect = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((productId) => productId !== id)
        : [...prev, id]
    );
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await Promise.all(selectedProducts.map((id) => deleteProduct(id)));
      toast.success("Products deleted successfully.");
      setSelectedProducts([]);
    } catch (error) {
      toast.error("An unexpected error occurred while deleting products.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {selectedProducts.length > 0 && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {selectedProducts.length}{" "}
            {selectedProducts.length === 1 ? "product" : "products"} selected
          </p>
          <Button
            variant="destructive"
            size="sm"
            onClick={onDelete}
            disabled={loading}
          >
            <Trash2Icon className="h-4 w-4 mr-2" />
            Delete Selected
          </Button>
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableCaption>A list of your products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedProducts.length === products?.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.length! > 0 ? (
              products?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => handleSelect(product.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 relative">
                        <Image
                          src={product.productImages[0].imageUrl}
                          alt={product.name}
                          fill
                          className="rounded-md object-cover"
                        />
                      </div>
                      <span>{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{format(product.createdAt, "PP")}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    {product.variants.reduce(
                      (totalStock, variant) => totalStock + variant.stock,
                      0
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={product.isArchived ? "secondary" : "default"}
                    >
                      {product.isArchived ? "Archived" : "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/admin/categories/${product.category.id}`}
                      className="hover:underline"
                    >
                      {product.category.name}
                    </Link>
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
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/products/${product.id}`}>
                            <PencilIcon className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleSelect(product.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2Icon className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
