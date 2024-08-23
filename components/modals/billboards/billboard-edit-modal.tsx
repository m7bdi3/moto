"use client";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Billboard } from "@prisma/client";
import { Dialog, DialogTrigger, DialogContent } from "../../ui/dialog";
import { AlertCircle, FolderPenIcon, MoreHorizontalIcon } from "lucide-react";
import { deleteBillboard, editBillboard } from "@/actions/BillboardsActions";

interface Props {
  billboard: Billboard;
}

export const BillboardEditModal = ({ billboard }: Props) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const form = useForm<z.infer<typeof billboardSchema>>({
    resolver: zodResolver(billboardSchema),
    defaultValues: {
      label: billboard.label,
      imageUrl: billboard.imageUrl,
    },
  });

  const onSubmit = async (values: z.infer<typeof billboardSchema>) => {
    try {
      setLoading(true);
      const res = await editBillboard(values, billboard.id);
      if (res.error) {
        toast.error(`Failed to edit store. ${res.error}`);
      } else {
        toast.success("Billboard editted successfully.");
      }
    } catch (error) {
      toast.error("Failed to edit baillboard.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await deleteBillboard(billboard.id);
      toast.success("Billboard deleted successfully.");
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to delete billboard.");
    } finally {
      setLoading(false);
    }
  };

  const AlertModal = () => {
    return (
      <Dialog
        onOpenChange={() => {
          deleteModalOpen;
        }}
      >
        <DialogContent>
          <div className="space-y-4 py-2 pb-4 flex gap-2">
            <AlertCircle className="text-red-500" />
            <p>
              Are you sure you want to delete this billboard? This action cannot
              be undone.
            </p>
          </div>
        </DialogContent>
        <div className="flex justify-end">
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </Dialog>
    );
  };

  return (
    <Dialog>
      <DialogTrigger
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <MoreHorizontalIcon className="w-5 h-5 " />
      </DialogTrigger>
      <DialogContent>
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
                  variant={"destructive"}
                  onClick={() => {
                    setDeleteModalOpen;
                  }}
                >
                  Delete
                </Button>
                <Button
                  disabled={loading}
                  type="submit"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
