"use client";
import { useUser } from "@/hooks/store/user";
import { UserNav } from "./UserHeader";
import React from "react";
import { Button } from "../ui/button";
import { useModalStore } from "@/hooks/store/use-store-modal";

export const UserAction = () => {
  const user = useUser((state) => state.user);
  const { openLogin } = useModalStore();

  return (
    <>
      {user ? (
        <UserNav />
      ) : (
        <div className="flex w-full items-center justify-center gap-4">
          <Button
            onClick={openLogin}
            className="text-primary-foreground flex-1"
          >
            Login
          </Button>
        </div>
      )}
    </>
  );
};
