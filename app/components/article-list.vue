<template>
  <div>
    <ul class="grid grid-cols-3 gap-8 p-8">
      <li
        class="border-gray-400 border-2 rounded-2xl p-4 shadow-gray-800 shadow-2xs *:shadow-lg hover:shadow-2xl transition-shadow duration-300"
        v-for="article in articles"
        :key="article.id"
      >
        <img
          v-if="article.image"
          :src="article.image"
          alt="Article Image"
          class="w-full h-48 object-cover rounded-lg mb-4"
        />
        <a :href="article.id">
          <h3>{{ article.title }}</h3>
        </a>
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
