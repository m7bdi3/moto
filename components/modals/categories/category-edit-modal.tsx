"use client";

import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { categorySchema } from "@/schemas/schemas";
import { toast } from "sonner";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogTrigger, DialogContent } from "../../ui/dialog";
import {
  AlertCircle,
  CheckIcon,
  ChevronsUpDown,
  FolderPenIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { deleteCategory, editCategory } from "@/actions/CategoriesActions";
import { CategoryWithBillboardAndUser } from "@/types";
import { Billboard } from "@prisma/client";
import { getBillboards } from "@/actions/BillboardsActions";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CommandItem } from "cmdk";
import { useStore } from "@/hooks/store/use-store";

interface Props {
  category: CategoryWithBillboardAndUser;
}

export const CategoryEditModal = ({ category }: Props) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [open, setOpen] = React.useState(false);
  const [openCategory, setopenCategory] = React.useState(false);
  const { Categories } = useStore();

  useEffect(() => {
    const fetchBillboards = async () => {
      const res = await getBillboards();
      setBillboards(res);
    };
    fetchBillboards();
  }, []);

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category.name,
      billboardId: category.billboard?.id || null,
    },
  });

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    if (values.parentId === category.id) {
      toast.error("A category cannot be its own parent.");
      return;
    }

    try {
      setLoading(true);
      const res = await editCategory(values, category.id);
      if (res.error) {
        toast.error(`${res.error}`);
      } else {
        toast.success("Category edited successfully.");
        setIsOpen(false);
      }
    } catch (error) {
      toast.error("An unexpected error occurred while editing the category.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      const res = await deleteCategory(category.id);
      if (res.error) {
        toast.error(`Failed to delete category. ${res.error}`);
      } else {
        toast.success("Category deleted successfully.");
        setIsOpen(false);
        setDeleteModalOpen(false);
      }
    } catch (error) {
      toast.error("An unexpected error occurred while deleting the category.");
    } finally {
      setLoading(false);
    }
  };

  const AlertModal = () => (
    <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
      <DialogContent>
        <div className="space-y-4 py-2 pb-4 flex gap-2 items-center justify-center">
          <AlertCircle className="text-red-500" />
          <p>
            Are you sure you want to delete this Category? This action cannot be
            undone.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger onClick={() => setIsOpen(true)}>
        <MoreHorizontalIcon className="w-5 h-5" />
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <div className="space-y-4 py-2 pb-4">
          <h2 className="font-semibold text-xl">Category Action</h2>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name your Category"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="billboardId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Billboard</FormLabel>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[200px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? billboards.find(
                                    (billboard) => billboard.id === field.value
                                  )?.label
                                : "Select A billboard"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search billboards..." />
                            <CommandList>
                              <CommandEmpty>No billboard found.</CommandEmpty>
                              <CommandGroup>
                                {billboards.map((billboard) => (
                                  <CommandItem
                                    value={billboard.id}
                                    key={billboard.id}
                                    onSelect={() => {
                                      form.setValue(
                                        "billboardId",
                                        billboard.id
                                      );
                                      setOpen(false);
                                    }}
                                    className="bg-transparent w-full flex items-center justify-start"
                                  >
                                    <CheckIcon
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        billboard.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    <span className="flex flex-1 w-full gap-2">
                                      <Image
                                        src={billboard.imageUrl}
                                        alt={billboard.label}
                                        width={20}
                                        height={10}
                                        className="object-cover rounded-md"
                                      />
                                      {billboard.label}
                                    </span>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        This is the Billboard that will be used in the category.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="parentId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Parent Category</FormLabel>
                      <Popover
                        open={openCategory}
                        onOpenChange={setopenCategory}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[250px] justify-between text-foreground",
                                !field.value && "text-forground"
                              )}
                            >
                              {field.value
                                ? Categories?.find(
                                    (category) =>
                                      category.id === field.value
                                  )?.name
                                : "Select A Parent Category"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search categories..." />
                            <CommandList className="text-foreground">
                              <CommandEmpty>No Categories found.</CommandEmpty>
                              <CommandGroup>
                                {Categories?.map((category) => (
                                  <CommandItem
                                    value={category.id}
                                    key={category.id}
                                    onSelect={() => {
                                      if (
                                        category.id ===
                                        form.getValues("parentId")
                                      ) {
                                        toast.error(
                                          "A category cannot be its own parent."
                                        );
                                      } else {
                                        form.setValue(
                                          "parentId",
                                          category.id
                                        );
                                        setopenCategory(false);
                                      }
                                    }}
                                    className="bg-transparent w-full flex items-center justify-start"
                                  >
                                    <CheckIcon
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        category.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {category.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Don&apos;t choose anything if is a main Category.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  variant="destructive"
                  onClick={() => setDeleteModalOpen(true)}
                  type="button"
                >
                  Delete
                </Button>
                <Button disabled={loading} type="submit">
                  Edit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
      {deleteModalOpen && <AlertModal />}
    </Dialog>
  );
};
