import { auth } from "@/auth";
import { SignIn } from "@/components/auth/LoginComponent";
import { redirect } from "next/navigation";
import React from "react";

export default async function Loginpage() {
  const session = await auth();
  if (!session) {
    return <SignIn />;
  } else {
    redirect("/");
  }
}
