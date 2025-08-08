import zod from "zod";

const envSchema = zod.object({
  GOOGLE_OAUTH_CLIENT_ID: zod.string().min(2).max(100),
  GOOGLE_OAUTH_CLIENT_SECRET: zod.string().min(2).max(100),
  DB_HOST: zod.string().min(2).max(100),
  DB_PORT: zod.string().min(2).max(100),
  DB_USER: zod.string().min(2).max(100),
  DB_PASSWORD: zod.string().min(2).max(100),
  DB_NAME: zod.string().min(2).max(100),
  DATABASE_URL: zod.string().url(),
  REDIS_HOST: zod.string().min(2).max(100),
  REDIS_PORT: zod.string().min(2).max(100),
  REDIS_PASSWORD: zod.string().min(2).max(100),
  BETTER_AUTH_SECRET: zod.string().min(2).max(100),
  BETTER_AUTH_URL: zod.string().url(),
});

export const env = envSchema.parse({
  GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  DATABASE_URL: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  REDIS_URL: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
});
