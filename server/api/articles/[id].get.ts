import { eq } from "drizzle-orm";
import { db } from "../../db";
import { articleTable } from "../../db/schema";

export default defineEventHandler({
  onRequest: [requireAuth],
  handler: async (event) => {
    const { id } = event.context.params as { id: string };

    console.log("Fetching article with ID:", id);

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Article ID is required",
      });
    }

    const article = await db
      .select()
      .from(articleTable)
      .where(eq(articleTable.id, String(id)))
      .limit(1)
      .execute();

    return article.length > 0 ? article[0] : null;
  },
});
