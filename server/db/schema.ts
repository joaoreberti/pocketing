import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
  text,
  boolean,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const articleTable = pgTable("articles", {
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
  userId: varchar()
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  url: text("url").notNull(), // URL of the article
  host: text("host").notNull(), // Hostname of the article
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export type User = typeof userTable.$inferSelect;
export type NewUser = typeof userTable.$inferInsert;

export type Article = typeof articleTable.$inferSelect;
export type NewArticle = typeof articleTable.$inferInsert;

export const schema = {
  article: articleTable,
  user: userTable,
  session,
  account,
  verification,
};
