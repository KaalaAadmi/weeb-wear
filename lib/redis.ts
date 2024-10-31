import { createClient } from "redis";

// Initialize Redis client

const redis = createClient({
  password: "bZTJ1FXzzL4sG5nqXh4LLcKgUcDvHkPb",
  socket: {
    host: "redis-18627.c328.europe-west3-1.gce.redns.redis-cloud.com",
    port: 18627,
  },
});

// Handle connection errors
redis.on("error", (err) => console.error("Redis Client Error", err));

// Connect the client if it's not already connected
async function connectRedis() {
  if (!redis.isOpen) {
    await redis.connect();
  }
}

// Export both the client and the connect function
export { redis, connectRedis };
