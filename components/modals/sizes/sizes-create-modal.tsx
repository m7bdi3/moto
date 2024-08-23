"use client";

import React, { useEffect, useState } from "react";
import * as z from "zod";
import { useModalStore } from "@/hooks/store/use-store-modal";
import { createSize } from "@/actions/sizesActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useStore } from "@/hooks/store/use-store";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SizeSchema } from "@/schemas/schemas";

type SizeFormValues = z.infer<typeof SizeSchema>;

export const SizesModal = () => {
  const { isSizeOpen, closeSize } = useModalStore();
  const [loading, setLoading] = useState(false);
  const { sizes } = useStore();

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(SizeSchema),
    defaultValues: {
      name: "",
      value: "",
      type: "APPAREL",
    },
  });

  const onSubmit = async (values: SizeFormValues) => {
    try {
      setLoading(true);
      const res = await createSize(values);
      if (res.error) {
        toast.error(`Error: ${res.error}`);
      } else {
        toast.success(`Size created successfully.`);
        closeSize();
      }
    } catch (error) {
      toast.error(`Failed to create size.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={"Create A Size"}
      description={"Add a new size"}
      isOpen={isSizeOpen}
      onClose={closeSize}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Size Name"
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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="APPAREL">Apparel</SelectItem>
                    <SelectItem value="SHOES">Shoes</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size Value</FormLabel>
                <Tabs defaultValue="apparel" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="apparel">Apparel</TabsTrigger>
                    <TabsTrigger value="shoes">Shoes</TabsTrigger>
                  </TabsList>
                  <TabsContent value="apparel">
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={form.watch("type") !== "APPAREL"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map(
                          (size) => (
                            <SelectItem
                              key={size}
                              value={size}
                              disabled={sizes?.some(
                                (existingSize) =>
                                  existingSize.value === size &&
                                  existingSize.type === "APPAREL"
                              )}
                            >
                              {size}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </TabsContent>
                  <TabsContent value="shoes">
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={form.watch("type") !== "SHOES"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 22 }, (_, i) =>
                          (i + 35).toString()
                        ).map((size) => (
                          <SelectItem
                            key={size}
                            value={size}
                            disabled={sizes?.some(
                              (existingSize) =>
                                existingSize.value === size &&
                                existingSize.type === "SHOES"
                            )}
                          >
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TabsContent>
                </Tabs>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormDescription>
            Sizes that are already created will be automatically disabled.
          </FormDescription>
          <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button disabled={loading} variant="outline" onClick={closeSize}>
              Cancel
            </Button>
            <Button disabled={loading} type="submit">
              Create
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
