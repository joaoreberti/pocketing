import tailwindcss from "@tailwindcss/vite";
import { env } from "./env";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  plugins: ["app/plugins/error-handler.ts"],

  modules: ["@pinia/nuxt"],
  runtimeConfig: {
    public: {
      GOOGLE_OAUTH_CLIENT_ID: env.GOOGLE_OAUTH_CLIENT_ID,
      BETTER_AUTH_URL: env.BETTER_AUTH_URL,
    },
  },
});
