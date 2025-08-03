<template>
  <div>
    <form @submit="handleFormSubmit">
      <input type="text" v-model="articleLink" />
      <button type="submit">Add</button>
    </form>
    <div>link: {{ articleLink }}</div>
  </div>
</template>

<script lang="ts" setup>
import { useMyArticlesListStore } from "../stores/articles-list";

const articleLink = ref("");

function handleFormSubmit(e: Event) {
  e.preventDefault();
  console.log({ articleLink: articleLink.value });
  useMyArticlesListStore().addArticle({
    id: "",
    title: "",
    content: "",
    author: "",
    publishedDate: new Date(),
    link: articleLink.value,
  });
}
</script>

<style></style>
