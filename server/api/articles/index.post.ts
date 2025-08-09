import {
  NewArticleRequest,
  NewArticleResponse,
} from "../../../shared/new-article.types";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import { articleTable } from "../../db/schema";
import { db } from "../../db";
import { auth } from "~~/server/auth";

export default defineEventHandler({
  onRequest: [requireAuth],
  handler: async (event) => {
    const body = await readBody(event);
    const { link } = body as NewArticleRequest;

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

    const resp = await fetch(link, {
      method: "GET",
    });

    const text = await resp.text();

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

    console.log("bana", link, new URL(link).hostname);

    const [insertedArticle] = await db
      .insert(articleTable)
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
        userId: session.user.id, // Use the authenticated user's ID
        publishedTime: article?.publishedTime
          ? new Date(article.publishedTime)
          : null,
        url: link, // Full URL of the article
        host: new URL(link).hostname ?? "", // Extract the hostname for the URL field
      })
      .returning();

    const response: NewArticleResponse = {
      id: insertedArticle.id,
    };

    return response;
  },
});
