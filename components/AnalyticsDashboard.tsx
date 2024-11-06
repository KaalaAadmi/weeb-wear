// import { BarChart, Card } from "@tremor/react";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import dynamic from "next/dynamic";
import { DeviceCharts } from "./DeviceCharts";
import { BarCharts } from "./BarCharts";
import { BrowserCharts } from "./BrowserCharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { AppSidebar } from "./Sidebar";

const MapWithTooltip = dynamic(() => import("../components/MapWithTooltip"), {
  ssr: false,
});

interface AnalyticsDashboardProps {
  avgVisitorsPerDay: number | undefined;
  totalUsersPerDay: Record<string, number> | undefined;
  topCountries: [string, number][];
  totalUsers: number | undefined;
  mapData: Record<string, number>;
  devices: Record<string, number>;
  browserData: Record<string, number>;
}

const Badge = ({ percentage }: { percentage: number }) => {
  const isPositive = percentage > 0;
  const isNeutral = percentage === 0;
  const isNegative = percentage < 0;

  if (isNaN(percentage)) return null;

  const positiveClassname = "bg-green-100 text-green-600 ring-green-600/25";
  const neutralClassname = "bg-gray-100 text-gray-600 ring-gray-600/25";
  const negativeClassname = "bg-red-100 text-red-600 ring-red-600/25";

  return (
    <span
      className={`inline-flex gap-1 items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
        isPositive
          ? positiveClassname
          : isNeutral
          ? neutralClassname
          : negativeClassname
      }`}
    >
      {isPositive ? <ArrowUpRight className="h-3 w-3" /> : null}
      {isNeutral ? <ArrowRight className="h-3 w-3" /> : null}
      {isNegative ? <ArrowDownRight className="h-3 w-3" /> : null}
      {percentage.toFixed(0)}%
    </span>
  );
};

const AnalyticsDashboard = ({
  avgVisitorsPerDay,
  totalUsersPerDay,
  topCountries,
  totalUsers,
  mapData,
  devices,
  browserData,
}: AnalyticsDashboardProps) => {
  const barChartData = totalUsersPerDay
    ? Object.entries(totalUsersPerDay).map(([date, visitors]) => ({
        date,
        visitors,
      }))
    : [];

  return (
    <>
      {/* <AppSidebar /> */}
      <div className="flex flex-col gap-6 p-2">
        <div className="grid w-full mx-auto grid-cols-1 sm:grid-cols-2 gap-3">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl text-black font-semibold">{totalUsers}</p>
            </CardContent>
            <CardFooter>
              <Badge percentage={0} />
            </CardFooter>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Avg. visitors/day</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl text-black font-semibold">
                {avgVisitorsPerDay}
              </p>
            </CardContent>
            <CardFooter>
              <Badge percentage={0} />
            </CardFooter>
          </Card>
        </div>
        <Card className="flex flex-col sm:grid grid-cols-4 gap-6">
          <CardHeader>
            <h2 className="w-full text-black text-center font-semibold text-xl">
              This week's top visitors:
            </h2>
          </CardHeader>
          <CardContent className="flex flex-row">
            <div className="col-span-3 flex items-center justify-between flex-row gap-8">
              {topCountries?.map(([countryCode, number]) => (
                <div
                  key={countryCode}
                  className="flex items-center gap-3 text-black"
                >
                  <p className="hidden sm:block text-gray-600">{countryCode}</p>
                  <ReactCountryFlag
                    className="text-5xl sm:text-3xl"
                    svg
                    countryCode={countryCode}
                  />
                  <p className="text-black">{number}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <MapWithTooltip mapData={mapData} />
        <div className="lg:flex lg:flex-row sm:flex-col gap-2">
          <DeviceCharts deviceData={devices} />
          <BrowserCharts browserData={browserData} />
        </div>
        <BarCharts data={barChartData} index="date" />
      </div>
    </>
  );
};

export default AnalyticsDashboard;
