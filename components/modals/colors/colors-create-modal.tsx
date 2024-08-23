"use client";
import React, { FC, useCallback, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Modal } from "../../modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { ColorSchema } from "@/schemas/schemas";
import { toast } from "sonner";
import { useModalStore } from "@/hooks/store/use-store-modal";
import { createColor } from "@/actions/colorsActions";
import Colorful from "@uiw/react-color-colorful";

export const ColorsModal = () => {
  const { isColorOpen, closeColor } = useModalStore();
  const [loading, setLoading] = useState(false);
  const [hex, setHex] = useState("#fff");

  const form = useForm<z.infer<typeof ColorSchema>>({
    resolver: zodResolver(ColorSchema),
    defaultValues: {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ColorSchema>) => {
    try {
      setLoading(true);
      const res = await createColor(values);
      if (res.error) {
        toast.error(`Error: ${res.error}`);
      } else {
        toast.success("Color created successfully.");
        closeColor();
      }
    } catch (error) {
      toast.error("Failed to create color.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create A Color"
      description="Add a new color "
      isOpen={isColorOpen}
      onClose={closeColor}
    >
      <div>
        <div className="space-y-4 py-2 pb-4 ">
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex w-full items-center justify-between gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Label</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name your color"
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
                  name="value"
                  render={({ field }) => (
                    <FormItem className="w-full flex justify-center items-center gap-2">
                      <FormControl>
                        <div className="p-4 bg-card rounded-md">
                          <Colorful
                            color={hex}
                            style={{
                              width: "200px",
                            }}
                            className="border shadow-md"
                            onChange={(color) => {
                              setHex(color.hex);
                              form.setValue("value", color.hex);
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={loading}
                  variant={"outline"}
                  onClick={closeColor}
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
