import { BetaAnalyticsDataClient } from "@google-analytics/data";

// const propertyId = "465508356";
const propertyId = "461692788";
const analyticsDataClient = new BetaAnalyticsDataClient();

const runReport = async () => {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: "2024-10-31",
        endDate: "today",
      },
    ],
    dimensions: [
      {
        name: "city",
      },
    ],
    metrics: [
      {
        name: "activeUsers",
      },
    ],
  });

  console.log("Report result:");
  const result: {
    city: string | null | undefined;
    activeUsers: string | null | undefined;
  }[] = [];

  if (response.rows) {
    response.rows.forEach((row) => {
      if (row.dimensionValues && row.metricValues) {
        const city = row.dimensionValues[0].value;
        const activeUsers = row.metricValues[0].value;
        console.log(city, activeUsers);
        result.push({ city, activeUsers });
      }
    });
  }
  return result;
};

export const GET = async () => {
  try {
    const data = await runReport();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch report data" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
