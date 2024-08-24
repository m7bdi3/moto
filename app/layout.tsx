import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
//////////////////////////////////////////////////////////////////
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
//////////////////////////////////////////////////////////////////
import { cn } from "@/lib/utils";
import InitUser from "@/hooks/store/initUser";
import { ThemeProvider } from "@/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/providers/modal-provider";
import { SessionProvider } from "next-auth/react";
import db from "@/lib/db";
import { LenisScroll } from "@/hooks/Lenis-Scroll";
//////////////////////////////////////////////////////////////////

export const metadata: Metadata = {
  title: "Moto",
  description: "Your next Ecommerce Platform",
};
const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

//////////////////////////////////////////////////////////////////

const userInfo = async () => {
  const session = await auth();

  if (!session) return null;
  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });
  return user;
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await userInfo();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <TooltipProvider>{children}</TooltipProvider>
            <LenisScroll/>
            <ModalProvider />
            <Toaster />
            <InitUser user={user || undefined} />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
