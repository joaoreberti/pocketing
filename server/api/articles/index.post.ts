import { articleService } from "~~/server/article/article.service";
import {
  NewArticleRequest,
  NewArticleResponse,
} from "../../../shared/new-article.types";
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

    return articleService.storeArticle(link, session.user.id);
  },
});
