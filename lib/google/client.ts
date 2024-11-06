// lib/google/client.ts

import { BetaAnalyticsDataClient } from "@google-analytics/data";
const credential = JSON.parse(
  Buffer.from(process.env.GOOGLE_ANALYTICS_CREDENTIALS!, "base64").toString()
);
// console.log("CREDENTIAL", credential);
export const analyticsDataClient = new BetaAnalyticsDataClient({
  projectId: credential.project_id,
  credentials: {
    client_email: credential.client_email,
    private_key: credential.private_key,
  },
});
