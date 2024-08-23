"use client";

import React from "react";
import { Bar, BarChart, XAxis, CartesianGrid, YAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Props {
  data: any[];
}

const chartConfig = {
  views: {
    label: "Total",
  },
} satisfies ChartConfig;

export function OverView({ data }: Props) {
  return (
    <Card>
      <CardContent className="sm:py-6 w-full pl-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[450px] w-full"
        >
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
              fontSize={12}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[160px]"
                  nameKey="name"
                  labelFormatter={(value) => `${value}`}
                />
              }
            />
            <Bar dataKey={"total"} fill={`#74342B`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
