"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

import { ChromeIcon, GithubIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
export function SignIn() {
  return (
    <Card className="flex flex-col items-center justify-center gap-2 py-4 m-4 h-[calc(100vh-35px)]">
      <CardHeader>
        <h2 className="text-3xl font-black tracking-tighter text-center">
          Sign In
        </h2>
        <p className="text-neutral-600">
          Choose your preferred sign-in method.
        </p>
      </CardHeader>
      <CardContent className="space-x-4 flex  items-center justify-center w-full">
        <Button
          variant="outline"
          className="justify-center gap-3"
          onClick={() => signIn("google", { redirectTo: "/" })}
        >
          <ChromeIcon className="h-6 w-6" />
          Sign in with Google
        </Button>
      </CardContent>
      <CardFooter className="text-center text-sm text-neutral-500">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </CardFooter>
    </Card>
  );
}
