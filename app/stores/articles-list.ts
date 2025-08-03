import { defineStore } from "pinia";
import type { Article } from "../shared/article.type";

export const useMyArticlesListStore = defineStore("articlesList", {
  state: () => ({
    articles: [] as Article[],
  }),
  actions: {
    addArticle(article: Article) {
      this.articles.push(article);
    },
    removeArticle(articleId: Article["id"]) {
      this.articles = this.articles.filter(
        (article) => article.id !== articleId
      );
    },
  },
});
