<script setup></script>

<template>
  <div
    v-if="useMyModalStore().isModalOpen"
    class="modal"
    v-outside="useMyModalStore().closeModal"
  >
    <p>Hello from the modal!</p>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
