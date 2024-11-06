"use client";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import { useEffect, useState } from "react";

type responseType = {
  topCountries: { country: string; users: number }[];
  totalUsers: number;
  totalUsersPerDay: Record<string, number>;
  averageUsersPerDay: number;
  visitorsToday: number;
  visitorsYesterday: number;
  mapData: Record<string, number>;
  devices: Record<string, number>;
  browserData: Record<string, number>;
};

const AdminPage = () => {
  const [analyticsData, setAnalyticsData] = useState<responseType | null>(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/analytics`
        );
        const data: responseType = await response.json();
        setAnalyticsData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAnalyticsData();
  }, []);
  const topCountriesMap = new Map<string, number>();
  analyticsData?.topCountries.forEach((country) => {
    topCountriesMap.set(country.country, country.users);
  });

  const topCountries = [...topCountriesMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="min-h-screen w-full py-12 flex justify-center items-center bg-[#f5f5f5]">
      <div className="relative w-full max-w-6xl mx-auto text-black">
        {analyticsData && (
          <AnalyticsDashboard
            avgVisitorsPerDay={analyticsData.averageUsersPerDay}
            totalUsersPerDay={analyticsData.totalUsersPerDay}
            topCountries={topCountries}
            totalUsers={analyticsData.totalUsers}
            mapData={analyticsData.mapData}
            devices={analyticsData.devices}
            browserData={analyticsData.browserData}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPage;
