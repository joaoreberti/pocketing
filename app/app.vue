<template>
  <div @click.self="useMyModalStore().closeModal">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <NewArticle />
  </div>
</template>

<script setup lang="ts">
import "./main.css";
</script>
