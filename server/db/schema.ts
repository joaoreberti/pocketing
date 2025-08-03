import {
  integer,
  jsonb,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const articlesTable = pgTable("articles", {
  id: uuid("id").primaryKey().defaultRandom(), // Use PostgreSQL's UUID generation function
  title: varchar({ length: 255 }).notNull(),
  content: varchar(),
  textContent: varchar(),
  length: integer().notNull(),
  excerpt: varchar(),
  byline: varchar(),
  dir: varchar(),
  siteName: varchar(), // Name of the site
  lang: varchar(), // Content language
  publishedTime: timestamp().defaultNow(), // Published time
  userId: integer()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export type Article = typeof articlesTable.$inferSelect;
export type NewArticle = typeof articlesTable.$inferInsert;
