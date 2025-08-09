import { authClient } from "~/libs/auth-client";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const session = await authClient.getSession();
  if (!session) {
    return navigateTo("/sign-in");
  }
});
