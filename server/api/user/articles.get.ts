import { eq } from "drizzle-orm";
import { auth } from "~~/server/auth";
import { db } from "~~/server/db";
import { articleTable } from "~~/server/db/schema";

export default defineEventHandler({
  onRequest: [requireAuth],
  handler: async (event) => {
    const headers = event.headers;

    const session = await auth.api.getSession({
      headers: headers,
    });

    if (!session?.user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    const articles = await db
      .select()
      .from(articleTable)
      .where(eq(articleTable.userId, session?.user.id))
      .limit(20)
      .execute();

    return articles.length > 0 ? articles : [];
  },
});
