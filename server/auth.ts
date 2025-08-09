import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { env } from "~~/env";
import { schema } from "./db/schema";
import { createRedisClient } from "./redis";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite",
    schema,
  }),
  secondaryStorage: {
    get: async (key) => {
      const redisClient = await createRedisClient();
      const value = await redisClient.get(key);
      return value ? value : null;
    },
    set: async (key, value, ttl) => {
      const redisClient = await createRedisClient();
      if (ttl) await redisClient.set(key, value, { EX: ttl });
      // or for ioredis:
      // if (ttl) await redis.set(key, value, 'EX', ttl)
      else await redisClient.set(key, value);
    },
    delete: async (key) => {
      const redisClient = await createRedisClient();
      await redisClient.del(key);
    },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: env.GOOGLE_OAUTH_CLIENT_SECRET,
    },
  },

  logger: {
    disabled: false,
    level: "info",
    log: (level, message, ...args) => {
      // Custom logging implementation
      console.log(`[${level}] ${message}`, ...args);
    },
  },
});
