"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with text";
const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
const today = new Date();
const formattedToday = today.toLocaleDateString("en-US", options);
const start = new Date(
  today.setUTCDate(today.getUTCDate() - 7)
).toLocaleDateString("en-US", options);

const end = new Date(
  today.setUTCDate(today.getUTCDate() - 1)
).toLocaleDateString("en-US", options);
export function DeviceCharts({
  deviceData,
}: {
  deviceData: Record<string, number>;
}): JSX.Element {
  // Ensure deviceData is always an object
  const safeDeviceData = deviceData || {};

  // Calculate total visitors
  const totalVisitors = React.useMemo(() => {
    return Object.values(safeDeviceData).reduce((acc, curr) => acc + curr, 0);
  }, [safeDeviceData]);

  // Create dynamic chart config
  const chartConfig = React.useMemo(() => {
    return Object.keys(safeDeviceData).reduce(
      (config, deviceCategory, index) => {
        config[deviceCategory] = {
          label:
            deviceCategory.charAt(0).toUpperCase() + deviceCategory.slice(1), // Capitalize the label
          color: `hsl(var(--chart-${index + 1}))`, // Dynamic color based on index
        };
        return config;
      },
      {} as ChartConfig
    );
  }, [safeDeviceData]);

  return (
    <Card className="flex flex-col lg:w-1/2 md:w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Device</CardTitle>
        <CardDescription>{`${start} - ${formattedToday}`}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig} // Pass chartConfig to ChartContainer
          className="mx-auto aspect-square max-h-[250px] aspect-1"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="deviceCategory" />}
            />
            <Pie
              data={Object.entries(safeDeviceData).map(
                ([deviceCategory, visitors], index) => ({
                  deviceCategory,
                  visitors,
                  fill: `hsl(var(--chart-${index + 1}))`, // Dynamic color based on index
                })
              )}
              dataKey="visitors"
              nameKey="deviceCategory"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 7 days
        </div>
      </CardFooter>
    </Card>
  );
}
