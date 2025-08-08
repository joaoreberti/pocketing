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
useHead({
  script: [
    {
      src: "https://accounts.google.com/gsi/client",
      async: true,
      defer: true,
    },
  ],
});
</script>
