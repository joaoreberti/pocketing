import {
  NewArticleRequest,
  NewArticleResponse,
} from "../../../shared/new-article.types";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import { articlesTable } from "../../db/schema";
import { db } from "../../db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { link } = body as NewArticleRequest;

  const resp = await fetch(link, {
    method: "GET",
  });

  const text = await resp.text();
  console.log("Fetched text:", text);

  const doc = new JSDOM(text, {
    url: link,
  });

  const reader = new Readability(doc.window.document, { keepClasses: false });
  const article = reader.parse();

  const sanitizedContent = article?.content
    ?.replace(/[\n\t]/g, "") // Remove newlines and tabs
    .trim(); // Remove leading and trailing whitespace

  const sanitizedTextContent = article?.textContent
    ?.replace(/[\n\t]/g, "") // Remove newlines and tabs
    .trim(); // Remove leading and trailing whitespace

  const [insertedArticle] = await db
    .insert(articlesTable)
    .values({
      title: article?.title ?? "",
      content: sanitizedContent ?? "",
      textContent: sanitizedTextContent ?? "",
      length: article?.length ?? 0,
      excerpt: article?.excerpt ?? "",
      byline: article?.byline ?? "",
      dir: article?.dir ?? "",
      siteName: article?.siteName ?? "",
      lang: article?.lang ?? "",
      userId: 1, // Assuming a default user ID for now
      publishedTime: article?.publishedTime
        ? new Date(article.publishedTime)
        : null,
    })
    .returning();

  const response: NewArticleResponse = {
    id: insertedArticle.id,
  };

  return response;
});
