"use client";
import React, { useState } from "react";
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
import { billboardSchema } from "@/schemas/schemas";
import { toast } from "sonner";
import { FileUpload } from "../../file-upload";
import { createBillboard } from "@/actions/BillboardsActions";
import { useModalStore } from "@/hooks/store/use-store-modal";

export const BillboardModal = () => {
  const { isBillboardOpen, closeBillboard } = useModalStore();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof billboardSchema>>({
    resolver: zodResolver(billboardSchema),
    defaultValues: {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof billboardSchema>) => {
    try {
      setLoading(true);
      const res = await createBillboard(values);
      if (res.error) {
        toast.error(`Failed to create Billboard. ${res.error}`);
      } else {
        toast.success("Billboard created successfully.");
        closeBillboard();
      }
    } catch (error) {
      toast.error("Failed to create Billboard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create A Billboard"
      isOpen={isBillboardOpen}
      onClose={closeBillboard}
      classname="max-w-4xl"
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name your billboard"
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
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Image</FormLabel>
                    <FormControl>
                      <FileUpload
                        value={field.value}
                        onChange={field.onChange}
                        endPoint="imageUploader"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={loading}
                  variant={"outline"}
                  onClick={closeBillboard}
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
