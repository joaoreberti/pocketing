export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:error", (err) => {
    console.error("An error occurred:", err);
    process.exit(1); // Exit the process with an error code
    //
  });
});
