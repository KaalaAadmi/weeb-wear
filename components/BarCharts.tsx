"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const chartData = [
  { date: "20241101", visitors: 100 },
  { date: "20241102", visitors: 200 },
  { date: "20241103", visitors: 150 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "#2563eb",
  },
  // mobile: {
  //   label: "Mobile",
  //   color: "#60a5fa",
  // },
} satisfies ChartConfig;
interface BarChartsProps {
  data: { date: string; visitors: number }[];
  index: string;
}
export function BarCharts({ data, index }: BarChartsProps) {
  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Bar Chart - User Count</CardTitle>
        <CardDescription>{`Visitor Count`}</CardDescription>
      </CardHeader>
      <CardContent className="w-full pb-2">
        <ChartContainer config={chartConfig} className="aspect-[16/9]">
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={index}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="visitors" fill="#2563eb" radius={4} />
            {/* <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} /> */}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">
          Showing visitors per day for the last 7 days
        </div>
      </CardFooter>
    </Card>
  );
}
