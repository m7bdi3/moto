"use client";

import React, { useMemo, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { ProductFormSchema, ProductSchema } from "@/schemas/schemas";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useStore } from "@/hooks/store/use-store";
import { createProduct } from "@/actions/ProductsActions";
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MultiFileUpload } from "@/components/file-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon, ChevronsUpDown, PlusCircle, XCircle } from "lucide-react";

export const ProductCreateForm = () => {
  const [loading, setLoading] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const { Categories, sizes, colors } = useStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      images: [],
      categoryId: "",
      isFeatured: false,
      isArchived: false,
      weight: "",
      discount: null,
      colorSizes: [],
    },
  });

  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({
    control: form.control,
    name: "colorSizes",
  });

  const selectedCategory = form.watch("categoryId");

  const filteredSizes = useMemo(() => {
    const category = Categories?.find((c) => c.id === selectedCategory);
    if (category?.parent?.name === "Apparel") {
      return sizes?.filter((s) => s.type === "APPAREL");
    }
    if (category?.parent?.name === "Shoes") {
      return sizes?.filter((s) => s.type === "SHOES");
    }
    return [];
  }, [selectedCategory, sizes, Categories]);

  const onSubmit = async (values: z.infer<typeof ProductFormSchema>) => {
    try {
      setLoading(true);
      const transformedValues = {
        ...values,
        variants: values.colorSizes.flatMap((cs) =>
          cs.sizes.map((size) => ({
            colorId: cs.colorId,
            sizeId: size.sizeId,
            stock: size.stock,
            price: size.price,
          }))
        ),
      };
      const { colorSizes, ...productData } = transformedValues;
      const res = await createProduct(productData);
      if (res.error) {
        toast.error(`Error: ${res.error}`);
      } else {
        toast.success("Product created successfully.");
        router.push("/admin/products");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred while creating the product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="p-6">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={categoryOpen}
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? Categories?.find(
                                (category) => category.id === field.value
                              )?.name
                            : "Select A Category"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search Categories..." />
                        <CommandList>
                          <CommandGroup>
                            {Categories?.map(
                              (category) =>
                                category.parentId !== null && (
                                  <CommandItem
                                    key={category.id}
                                    value={category.id}
                                    onSelect={() => {
                                      form.setValue("categoryId", category.id);
                                      setCategoryOpen(false);
                                    }}
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
                                    {category.parentId && (
                                      <span className="ml-auto text-xs text-muted-foreground">
                                        {
                                          Categories?.find(
                                            (c) => c.id === category?.parentId
                                          )?.name
                                        }
                                      </span>
                                    )}
                                  </CommandItem>
                                )
                            )}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name your Product"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your product"
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
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0 KG"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="$0.0"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        disabled={loading}
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
                        value={field.value === null ? "" : field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-4">
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Images</FormLabel>
                    <FormControl>
                      <MultiFileUpload
                        endPoint="imageUploader"
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Featured</FormLabel>
                        <FormDescription>
                          This product will appear on the homepage.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isArchived"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Archived</FormLabel>
                        <FormDescription>
                          This product will not be visible in the store.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Product Variants</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendColor({ colorId: "", sizes: [] })}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Color
              </Button>
            </div>
            {colorFields.map((colorField, colorIndex) => (
              <div
                key={colorField.id}
                className="space-y-4 p-4 border rounded-md"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Color {colorIndex + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeColor(colorIndex)}
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
                <FormField
                  control={form.control}
                  name={`colorSizes.${colorIndex}.colorId`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Color" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {colors?.map((color) => (
                            <SelectItem key={color.id} value={color.id}>
                              {color.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium">Sizes</h5>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const currentSizes =
                          form.getValues(`colorSizes.${colorIndex}.sizes`) ||
                          [];
                        form.setValue(`colorSizes.${colorIndex}.sizes`, [
                          ...currentSizes,
                          { sizeId: "", stock: 1, price: "" },
                        ]);
                      }}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Size
                    </Button>
                  </div>
                  {form
                    .watch(`colorSizes.${colorIndex}.sizes`)
                    ?.map((_, sizeIndex) => (
                      <div key={sizeIndex} className="flex items-center gap-4">
                        <FormField
                          control={form.control}
                          name={`colorSizes.${colorIndex}.sizes.${sizeIndex}.sizeId`}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Size</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Size" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {filteredSizes?.map((size) => (
                                    <SelectItem key={size.id} value={size.id}>
                                      {size.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`colorSizes.${colorIndex}.sizes.${sizeIndex}.stock`}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Stock</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(
                                      parseInt(e.target.value, 10) || 0
                                    )
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`colorSizes.${colorIndex}.sizes.${sizeIndex}.price`}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Price</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="$0.0" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const currentSizes = form.getValues(
                              `colorSizes.${colorIndex}.sizes`
                            );
                            form.setValue(
                              `colorSizes.${colorIndex}.sizes`,
                              currentSizes.filter(
                                (_, index) => index !== sizeIndex
                              )
                            );
                          }}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button disabled={loading} type="submit">
            {loading ? "Creating..." : "Create Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
