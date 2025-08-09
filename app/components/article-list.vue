<template>
  <div>
    <ul>
      <li v-for="article in articles" :key="article.id">
        <h3>{{ article.title }}</h3>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { Article } from "../../server/db/schema";

const articles = ref<Article[]>([]);

try {
  const response = await useFetch<Article[]>("/api/user/articles");
  console.log("Fetched articles:", response);
  if (response.error.value) {
    navigateTo("/sign-in");
  }
  articles.value = response.data.value ?? [];
} catch (error) {
  console.error("Error fetching articles:", error);
}
</script>

<style></style>
