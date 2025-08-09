<template>
  <div class="p-2">
    <div class="flex items-center gap-0">
      <button
        class="border border-r-0 p-1 border-gray-300 rounded-xl rounded-r-none hover:cursor-pointer"
        :class="{
          'border border-gray-500 border-s-1 p-1 border-r-0 rounded-xl rounded-r-none ':
            isInputFocused,
        }"
      >
        <MagnifyingGlassIcon class="size-6" />
      </button>
      <input
        @focus="handleInputFocus"
        @blur="handleInputBlur"
        type="search"
        placeholder="Search by title or URL"
        class="border p-1 border-gray-300 border-l-0 focus:outline-none rounded-xl rounded-l-none focus:border-gray-500"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
const isInputFocused = ref(false);

function handleInputFocus() {
  isInputFocused.value = true;
}
function handleInputBlur() {
  isInputFocused.value = false;
}
</script>
