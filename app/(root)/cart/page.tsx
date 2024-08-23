import React from "react";
import { CartComponent } from "./_components/CartComponent";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();
  if (!session || !session.user.id) redirect("/login");
  return <CartComponent />;
}
