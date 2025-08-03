import { eq } from "drizzle-orm";
import { db } from "../../db";
import { articlesTable } from "../../db/schema";

export default defineEventHandler(async (event) => {
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
    .from(articlesTable)
    .where(eq(articlesTable.id, String(id)))
    .limit(1)
    .execute();

  console.log("Fetched article:", article[0]);

  return article.length > 0 ? article[0] : null;
});
