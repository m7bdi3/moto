import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSection } from "@/components/Account/ProfileSection";
import { SettingsSection } from "@/components/Account/settingsSection";
import db from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AccountOrders from "@/components/Account/AccountOrders";

export default async function Page() {
  const user = await auth();
  if (!user) redirect("/");
  const orders = await db.order.findMany({
    where: {
      userId: user.user.id,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: {
            select: {
              name: true,
              price: true,
              productImages: {
                select: {
                  imageUrl: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
    skip: 0,
    distinct: "id",
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileSection />
        </TabsContent>
        <TabsContent value="orders">
          <AccountOrders orders={orders as any} />
        </TabsContent>
        <TabsContent value="settings">
          <SettingsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
