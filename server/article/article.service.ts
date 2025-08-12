import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import { Article, articleTable } from "../db/schema";
import { db } from "../db";
import { NewArticleResponse } from "~~/shared/new-article.types";
import { enhancePage } from "./helpers/enhance-dom";
import { getLinkPreview } from "link-preview-js";

export const articleService = {
  async storeArticle(
    link: string,
    userId: string
  ): Promise<NewArticleResponse> {
    const resp = await fetch(link, {
      method: "GET",
    });

    const text = await resp.text();

    const insertedArticle = await articleMapper(text, link, userId);

    const response: NewArticleResponse = {
      id: insertedArticle.id,
    };
    return response;
  },
};

async function articleMapper(
  fetchedText: string,
  link: string,
  userId: string
): Promise<Article> {
  const dom = new JSDOM(fetchedText, {
    url: link,
  });

  enhancePage(dom);

  const reader = new Readability(dom.window.document, { keepClasses: false });
  const article = reader.parse();

  const sanitizedContent = article?.content
    ?.replace(/[\n\t]/g, "") // Remove newlines and tabs
    .trim(); // Remove leading and trailing whitespace

  const sanitizedTextContent = article?.textContent
    ?.replace(/[\n\t]/g, "") // Remove newlines and tabs
    .trim(); // Remove leading and trailing whitespace

  const linkMetadata = await fetchLinkMetadata(link);

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
      userId: userId, // Use the authenticated user's ID
      publishedTime: article?.publishedTime
        ? new Date(article.publishedTime)
        : null,
      url: link, // Full URL of the article
      host: new URL(link).hostname ?? "", // Extract the hostname for the URL field
      metaDescription: linkMetadata?.metaDescription ?? "",
      metaImage: linkMetadata?.metaImage ?? "",
      favicon: linkMetadata?.favicon ?? "",
      image: linkMetadata?.image ?? "",
    })
    .returning();

  return insertedArticle;
}

async function fetchLinkMetadata(url: string) {
  try {
    const data = await getLinkPreview(url, {
      timeout: 3000,
      followRedirects: "follow",
    });

    // Map the metadata to our schema fields
    return {
      metaDescription: "description" in data ? data.description : null,
      metaImage:
        "images" in data && Array.isArray(data.images) ? data.images[0] : null,
      favicon: Array.isArray(data.favicons) ? data.favicons[0] : null,
      image:
        "images" in data && Array.isArray(data.images) ? data.images[0] : null,
    };
  } catch (error) {
    console.error("Error fetching link metadata:", error);
    return null;
  }
}
