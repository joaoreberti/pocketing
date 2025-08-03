<template>
  <div>
    <!-- <NewArticle></NewArticle> -->
    <!-- <ul>
      list
      <li v-for="article in store.articles" :key="article.id">
        {{ article.link }}
      </li>
    </ul> -->
    <Converter></Converter>
  </div>
</template>

<script lang="ts" setup>
import NewArticle from "../components/new-article.vue";
import { useMyArticlesListStore } from "../stores/articles-list";

const store = useMyArticlesListStore();
</script>

<style></style>
