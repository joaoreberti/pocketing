<template>
  <div class="h-screen flex justify-center items-center">
    <div class="mx-auto max-w-sm border-1 border-gray-300 p-8 rounded-xl">
      <div class="*:text-center *:text-gray-700">
        <div class="grid gap-4">
          <button class="w-full" @click="login">Login with Google</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { authClient } from "../libs/auth-client";

function login() {
  authClient.signIn.social({
    provider: "google",
    callbackURL: "/",
    errorCallbackURL: "/error",
    newUserCallbackURL: "/",
  });
}
</script>

<style></style>
