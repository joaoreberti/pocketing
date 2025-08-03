<template>
  <Navbar> </Navbar>
  <slot />
  <!-- <Footer></Footer> -->
</template>

<script lang="ts" setup>
import Navbar from "../components/header/navbar.vue";
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");

html {
  font-size: 16px;
  padding: 32px;
}

body {
  font-family: "Roboto", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  color: gray;
}
</style>
