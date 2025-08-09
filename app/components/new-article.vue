<template>
  <div
    v-if="useMyModalStore().isModalOpen"
    class="modal bg-white p-4 shadow-lg rounded"
    v-outside="useMyModalStore().closeModal"
  >
    <form
      action="/new-article"
      method="post"
      class="flex flex-col gap-2"
      @submit.prevent="handleForm"
    >
      <input
        ref="articleLinkInput"
        type="text"
        name="articleLink"
        placeholder="Article Link"
        v-model="articleLink"
        autocomplete="off"
        class="border p-2 border-gray-300 rounded focus:outline-none focus:border-gray-500"
      />
      <button
        class="p-1 cursor-pointer text-white rounded-xs"
        :class="{
          'bg-red-400 hover:bg-red-600': isValidForm,
          'bg-gray-300 cursor-not-allowed': !isValidForm,
        }"
        type="submit"
        :disabled="!isValidForm"
      >
        Pocket Article
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const articleLink = ref("");
const articleLinkInput = ref<HTMLInputElement | null>(null);
const html = ref("");

const handleForm = async () => {
  if (isValidForm.value) {
    const link = getUrlFromInput(articleLink.value.trim());
    useMyModalStore().closeModal();

    const response = await $fetch("/api/articles", {
      method: "POST",
      body: { link },
    });

    if (response.id) {
      console.log("Article created with ID:", response.id);
      navigateTo(`/${response.id}`);
    }

    console.log("Submitting article link:", link);
  } else {
    console.error("Invalid article link");
  }
};

const isValidForm = computed(() => {
  let trimmedValue = articleLink.value.trim();
  try {
    trimmedValue = getUrlFromInput(trimmedValue);
    new URL(trimmedValue);
    return trimmedValue !== "";
  } catch (_e) {}
  return false;
});

watch(
  () => useMyModalStore().isModalOpen,
  async (isOpen) => {
    await nextTick(); // Wait for DOM updates
    if (isOpen) {
      articleLinkInput.value?.focus();
    }
  }
);

function getUrlFromInput(trimmedValue: string) {
  if (trimmedValue.includes("http://") || trimmedValue.includes("https://")) {
  } else {
    trimmedValue = "http://" + trimmedValue;
  }
  return trimmedValue;
}
</script>

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
