"use client";

import { useUser } from "@/hooks/store/user";
import { User } from "@prisma/client";
import { useEffect, useRef } from "react";

export default function InitUser({ user }: { user: User | undefined }) {
  const initState = useRef(false);

  useEffect(() => {
    if (!initState.current && user) {
      useUser.setState({ user });
      initState.current = true;
    }
  }, [user]);

  return null;
}
