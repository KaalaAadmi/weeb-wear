import { Schema, model, models } from "mongoose";

interface EventDocument {
  namespace: string;
  date: string;
  viewCount: number;
  countryViews: Map<string, number>;
  expireAt?: Date;
}

const eventSchema = new Schema<EventDocument>({
  namespace: { type: String, required: true },
  date: { type: String, required: true },
  viewCount: { type: Number, default: 0 },
  countryViews: { type: Map, of: Number }, // Tracks views per country

  // Optional expireAt field for automatic deletion (TTL index)
  expireAt: { type: Date, index: { expires: "7d" } },
});

const Event = models?.Event || model<EventDocument>("Event", eventSchema);

export default Event;
