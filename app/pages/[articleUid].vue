<template>
  <main class="article-page p-8">
    <Configuration />
    <h1 class="text-center font-bold text-2xl mb-4">{{ title }}</h1>
    <div
      v-html="articleHTML"
      class="article-content"
      :style="{ ...useMyArticleStyleStore().articleStyle }"
    ></div>
  </main>
</template>

<script lang="ts" setup>
import type { Article } from "../../server/db/schema";
import { ref } from "vue";

const articleHTML = ref("");
const title = ref("");
const { articleUid } = useRoute().params as { articleUid: string };

const response = await useFetch<Article>(`/api/articles/${articleUid}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});
if (response.status.value !== "success") {
  throw new Error(`Failed to fetch article: ${response.status.value}`);
}

articleHTML.value = response.data.value?.content || "";
title.value = response.data.value?.title || "";
</script>

<style>
.article-page button {
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.article-content {
  padding: 20px;
  border-radius: 8px;
}

.article-content p {
  margin-bottom: 1em; /* Add spacing between paragraphs */
}
</style>
