import { Pool } from "pg";
import { getDate } from "@/utils";
import { parse } from "date-fns";

// Create a new pool instance for PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.POSTGRESQL_URI,
});

type AnalyticsArgs = {
  retention?: number;
};

type TrackOptions = {
  persist?: boolean;
};

export class Analytics {
  private retention: number = 60 * 60 * 24 * 7;

  constructor(opts?: AnalyticsArgs) {
    if (opts?.retention) this.retention = opts.retention;
  }

  async track(
    namespace: string,
    event: Record<string, any> = {},
    opts?: TrackOptions
  ) {
    const date = getDate();
    const key = opts?.persist
      ? `analytics::${namespace}`
      : `analytics::${namespace}::${date}`;

    // PostgreSQL query to increment the view count for a specific event and date
    await pool.query(
      `
      INSERT INTO analytics (namespace, date, event_data, view_count) 
      VALUES ($1, $2, $3, 1) 
      ON CONFLICT (namespace, date, event_data) 
      DO UPDATE SET view_count = analytics.view_count + 1
      `,
      [key, date, JSON.stringify(event)]
    );

    // Optionally add expiry handling based on the retention period if needed
  }

  async retrieveDays(namespace: string, nDays: number) {
    const promises: ReturnType<typeof this.retrieve>[] = [];

    for (let i = 0; i < nDays; i++) {
      const formattedDate = getDate(i);
      promises.push(this.retrieve(namespace, formattedDate));
    }

    const fetched = await Promise.all(promises);

    // Sort results by date
    const data = fetched.sort((a, b) => {
      if (
        parse(a.date, "dd/MM/yyyy", new Date()) >
        parse(b.date, "dd/MM/yyyy", new Date())
      ) {
        return 1;
      } else {
        return -1;
      }
    });

    return data;
  }

  async retrieve(namespace: string, date: string) {
    const res = await pool.query(
      `
      SELECT event_data, view_count FROM analytics 
      WHERE namespace = $1 AND date = $2
      `,
      [`analytics::${namespace}::${date}`, date]
    );

    return {
      date,
      events: res.rows.map((row) => ({
        [row.event_data]: Number(row.view_count),
      })),
    };
  }
}

export const analytics = new Analytics();
