import { createClient } from "redis";
import { env } from "~~/env";

export async function createRedisClient() {
  try {
    const client = createClient({ url: env.REDIS_URL });
    client.on("error", (err) => {
      console.log("Redis Client Error", err);
    });
    await client.connect();
    return client;
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
    throw error;
  }
}
