"use client";

import React from "react";
import { CreditCard, DollarSign, Package2Icon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getGraphRevenue,
  getSalesCount,
  getStockCount,
  GetTotalRevenue,
  GraphData,
} from "@/actions/DashboardStats";
import { OverView } from "./OverView";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface CardProps {
  title: string;
  value: string | number;
  icon: React.FC<any>;
  isLoading?: boolean;
}

const StatCard = ({ title, value, icon: Icon, isLoading }: CardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="dark:bg-muted dark:text-secondary-foreground h-full">
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <Separator className="my-2" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-24" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

export default function DashboardMain() {
  const [totalRevenue, setTotalRevenue] = React.useState(0);
  const [salesCount, setSalesCount] = React.useState(0);
  const [stockCount, setStockCount] = React.useState(0);
  const [graphRevenue, setGraphRevenue] = React.useState<GraphData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [revenue, sales, stock, graph] = await Promise.all([
          GetTotalRevenue(),
          getSalesCount(),
          getStockCount(),
          getGraphRevenue(),
        ]);
        setTotalRevenue(revenue);
        setSalesCount(sales);
        setStockCount(stock);
        setGraphRevenue(graph);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 sm:px-6 py-12 md:gap-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Revenue"
          value={`$ ${totalRevenue.toFixed(2)}`}
          icon={DollarSign}
          isLoading={isLoading}
        />
        <StatCard
          title="Sales"
          value={`+${salesCount}`}
          icon={CreditCard}
          isLoading={isLoading}
        />
        <StatCard
          title="Stock"
          value={stockCount}
          icon={Package2Icon}
          isLoading={isLoading}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="dark:bg-muted dark:text-secondary-foreground col-span-4">
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Total Revenue for the year.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <OverView data={graphRevenue} />
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
