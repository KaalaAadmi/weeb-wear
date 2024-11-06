import { analyticsDataClient } from "@/lib/google/client";
import { NextResponse } from "next/server";
import { getCode, getName } from "country-list";
import { BetaAnalyticsDataClient, protos } from "@google-analytics/data";

const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID!;

type TransformedData = {
  topCountries: { country: string; users: number }[];
  totalUsers: number;
  totalUsersPerDay: Record<string, number>;
  averageUsersPerDay: number;
  visitorsToday: number;
  visitorsYesterday: number;
  mapData: Record<string, number>; // Add mapData type
  devices: Record<string, number>; // Add devices type
  browserData: Record<string, number>; // Add browserData type
};

function transformAnalyticsData(
  response: protos.google.analytics.data.v1beta.IRunReportResponse
): TransformedData {
  const today = new Date().toISOString().split("T")[0]; // e.g., "2024-11-04"
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
    .toISOString()
    .split("T")[0]; // e.g., "2024-11-03"

  let totalUsers = 0;
  const usersPerDay: Record<string, number> = {};
  const countryUsers: Record<string, number> = {};
  let visitorsToday = 0;
  let visitorsYesterday = 0;
  const devices: Record<string, number> = {};
  const browserData: Record<string, number> = {};
  // console.log(response?.rows?.[0].dimensionValues);
  response?.rows?.forEach((row) => {
    const browserName = row?.dimensionValues?.[8]?.value ?? ""; // Get browser from "browser" dimension
    // console.log(browserName);
    // const activeUsers = row?.metricValues?.[0]?.value
    //   ? parseInt(row.metricValues[0].value, 10)
    //   : 0; // Get activeUsers from the first metric

    if (browserName !== "(not set)") {
      if (!browserData[browserName]) {
        browserData[browserName] = 0;
      }
      browserData[browserName] += browserData[browserName] + 1;
    }
  });

  response?.rows?.forEach((row) => {
    const countryName = row?.dimensionValues?.[1]?.value ?? ""; // Country name from dimensionValues[1]
    const date = row?.dimensionValues?.[3]?.value ?? ""; // Date from dimensionValues[3]

    const users = row?.metricValues?.[0]?.value
      ? parseInt(row.metricValues[0].value, 10)
      : 0; // assuming activeUsers is at index 0

    // Convert the country name to its corresponding country code
    const countryCode = getCode(countryName) || countryName; // Fallback to name if code not found

    // Count total users
    totalUsers += users;

    // Accumulate users per country
    if (countryCode) {
      countryUsers[countryCode] = (countryUsers[countryCode] || 0) + users;
    }

    // Accumulate users per day
    if (date) {
      usersPerDay[date] = (usersPerDay[date] || 0) + users;
    }

    // Check if users visited today or yesterday
    if (date === today) {
      visitorsToday += users;
    } else if (date === yesterday) {
      visitorsYesterday += users;
    }
  });

  // Get top 5 countries by user count
  const topCountries = Object.entries(countryUsers)
    .map(([country, users]) => ({ country, users }))
    .sort((a, b) => b.users - a.users)
    .slice(0, 5);

  // Calculate average users per day
  const totalDays = Object.keys(usersPerDay).length;
  const averageUsersPerDay = totalDays ? totalUsers / totalDays : 0;
  // store map data as Ireland:10
  const mapData = Object.entries(countryUsers).reduce(
    (acc, [country, users]) => {
      const countryName = getName(country) || country;
      acc[countryName] = users;
      return acc;
    },
    {} as Record<string, number>
  );

  // Prepare mapData for the response
  // const mapData = countryUsers;
  // Iterate over each row of the API response
  response?.rows?.forEach((row) => {
    const deviceCategory = row?.dimensionValues?.find(
      (dimension) =>
        dimension.value === "desktop" ||
        dimension.value === "mobile" ||
        dimension.value === "tablet"
    )?.value;

    const activeUsers = parseInt(
      String(row?.metricValues?.find((metric) => metric?.value)?.value || 0),
      10
    );

    // Check if the device category exists in the devices object, if not, initialize it
    if (deviceCategory) {
      if (devices[deviceCategory]) {
        devices[deviceCategory] += activeUsers;
      } else {
        devices[deviceCategory] = activeUsers;
      }
    }
  });
  const uPerDay = Object.entries(usersPerDay).map(([date, visitors]) => {
    const d =
      date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6, 8);
    return {
      date: d,
      visitors: visitors,
    };
  });
  return {
    topCountries,
    totalUsers,
    totalUsersPerDay: uPerDay.reduce(
      (acc: Record<string, number>, { date, visitors }) => {
        acc[date] = visitors;
        return acc;
      },
      {}
    ),
    averageUsersPerDay,
    visitorsToday,
    visitorsYesterday,
    mapData, // Include the mapData in the response
    devices,
    browserData,
  };
}
export const GET = async () => {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: "7daysAgo",
        endDate: "today",
      },
    ],
    dimensions: [
      {
        name: "city",
      },
      {
        name: "country",
      },
      {
        name: "continent",
      },
      {
        name: "date",
      },
      {
        name: "dayOfWeekName",
      },
      {
        name: "deviceCategory",
      },
      {
        name: "region",
      },
      {
        name: "countryId",
      },
      {
        name: "browser",
      },
    ],
    metrics: [
      {
        name: "activeUsers",
      },
      {
        name: "newUsers",
      },
      {
        name: "addToCarts",
      },
      {
        name: "averageSessionDuration",
      },
      {
        name: "crashFreeUsersRate",
      },
      {
        name: "screenPageViews",
      },
      {
        name: "totalUsers",
      },
      {
        name: "userEngagementDuration",
      },
      {
        name: "totalRevenue",
      },
    ],
    returnPropertyQuota: true,
    keepEmptyRows: true,
  });

  const transformedData = transformAnalyticsData(response);

  return new NextResponse(JSON.stringify(transformedData));
};
