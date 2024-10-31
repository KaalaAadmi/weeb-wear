// import connect from "@/lib/db"; // MongoDB connection
// import { getDate } from "@/utils"; // Date formatting
// import { parse } from "date-fns";
// import EventModel from "@/lib/models/Event"; // Using the defined Event model

// type AnalyticsArgs = {
//   retention?: number;
// };

// type TrackOptions = {
//   persist?: boolean;
// };

// export class Analytics {
//   private retention: number = 60 * 60 * 24 * 7; // 7 days in seconds

//   constructor(opts?: AnalyticsArgs) {
//     if (opts?.retention) this.retention = opts.retention;
//   }

//   async track(
//     namespace: string,
//     event: Record<string, number> = {},
//     opts?: TrackOptions
//   ) {
//     await connect();

//     const keyDate = getDate();
//     const key = opts?.persist ? namespace : `${namespace}::${keyDate}`;

//     const eventData = await EventModel.findOneAndUpdate(
//       { namespace: key, date: keyDate },
//       { $inc: event },
//       { upsert: true, new: true }
//     );

//     if (!opts?.persist) {
//       const expireAt = new Date(Date.now() + this.retention * 1000);
//       await eventData.updateOne({ $set: { expireAt } });
//     }
//   }

//   async retrieveDays(namespace: string, nDays: number) {
//     const promises: Promise<{
//       date: string;
//       events: Record<string, number>;
//     }>[] = [];

//     for (let i = 0; i < nDays; i++) {
//       const formattedDate = getDate(i);
//       promises.push(this.retrieve(namespace, formattedDate));
//     }

//     const fetched = await Promise.all(promises);

//     return fetched.sort((a, b) =>
//       parse(a.date, "dd/MM/yyyy", new Date()) >
//       parse(b.date, "dd/MM/yyyy", new Date())
//         ? 1
//         : -1
//     );
//   }

//   async retrieve(namespace: string, date: string) {
//     await connect();

//     const result = await EventModel.findOne({
//       namespace: `${namespace}::${date}`,
//       date,
//     });

//     return {
//       date,
//       events: Object.entries(result?.events ?? {}).reduce(
//         (acc, [key, value]) => ({ ...acc, [key]: Number(value) }),
//         {}
//       ),
//     };
//   }
// }

// export const analytics = new Analytics();
