"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DeleteUserAccount } from "@/actions/userActions";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export const SettingsSection = () => {
  const user = useSession();
  if (!user) {
    return null;
  }

  const onClick = async () => {
    await DeleteUserAccount(user.data?.user.id!);
    redirect("/");
  };

  return (
    <Card className="border-destructive">
      <CardHeader className="space-y-4">
        <CardTitle>Danger</CardTitle>
        <CardDescription>
          This action will delete you account from the system and can not be
          undone.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger>
            <Button variant="destructive" className="w-full justify-start">
              <Trash2Icon className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={onClick} variant={"destructive"}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
