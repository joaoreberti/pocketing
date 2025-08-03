import { defineNuxtPlugin } from "nuxt/app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("outside", {
    beforeMount(
      el: {
        clickOutsideEvent: {
          (event: any): void;
          (this: Document, ev: MouseEvent): any;
        };
        contains: (arg0: any) => any;
      },
      binding: { value: (arg0: any) => void }
    ) {
      el.clickOutsideEvent = function (event) {
        // Check if the clicked element is neither the element
        // to which the directive is applied nor its child
        if (!(el === event.target || el.contains(event.target))) {
          console.log("Clicked outside the element");
          // Invoke the provided method
          binding.value(event);
        }
      };
      document.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted(el: {
      clickOutsideEvent: (this: Document, ev: MouseEvent) => any;
    }) {
      // Remove the event listener when the bound element is unmounted
      document.removeEventListener("click", el.clickOutsideEvent);
    },
  });
});
