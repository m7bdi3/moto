"use client";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { categorySchema } from "@/schemas/schemas";
import { useModalStore } from "@/hooks/store/use-store-modal";
import { Modal } from "../../modal";
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
import { toast } from "sonner";
import { createCategory } from "@/actions/CategoriesActions";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { getBillboards } from "@/actions/BillboardsActions";
import { Billboard } from "@prisma/client";
import Image from "next/image";
import { useStore } from "@/hooks/store/use-store";

export const CategoryModal = () => {
  const { isCategoryOpen, closeCategory } = useModalStore();
  const { Categories } = useStore();
  const [loading, setLoading] = useState(false);
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [openBillboard, setOpenBillboard] = React.useState(false);
  const [openCategory, setopenCategory] = React.useState(false);

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
      name: "",
      billboardId: null,
      parentId: null,
    },
  });

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    try {
      setLoading(true);
      const res = await createCategory(values);
      if (res.error) {
        toast.error(`Failed to create category. ${res.error}`);
      } else {
        toast.success("Category created successfully.");
        closeCategory();
      }
    } catch (error) {
      toast.error("An unexpected error occurred while creating the category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create A Category"
      description="Add a new category "
      isOpen={isCategoryOpen}
      onClose={closeCategory}
      classname="max-w-4xl"
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
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
                        placeholder="Name your category"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4 ">
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
                                    (category) => category.id === field.value
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
                                {Categories?.map(
                                  (category) =>
                                    category.parentId === null && (
                                      <CommandItem
                                        value={category.id}
                                        key={category.id}
                                        onSelect={() => {
                                          form.setValue(
                                            "parentId",
                                            category.id
                                          );
                                          setopenCategory(false);
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
                                    )
                                )}
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
                <FormField
                  control={form.control}
                  name="billboardId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Billboard</FormLabel>
                      <Popover
                        open={openBillboard}
                        onOpenChange={setOpenBillboard}
                      >
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
                                      setOpenBillboard(false);
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
              </div>
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={loading}
                  variant={"outline"}
                  onClick={closeCategory}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
