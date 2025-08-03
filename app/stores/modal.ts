import { defineStore } from "pinia";

export const useMyModalStore = defineStore("modal", {
  actions: {
    openModal(e: MouseEvent | null = null) {
      e?.preventDefault();
      e?.stopPropagation();

      this.$patch({ modal: true });
    },
    closeModal(e: MouseEvent | null = null) {
      e?.preventDefault();
      e?.stopPropagation();
      this.$patch({ modal: false });
    },
    toggleModal(e: MouseEvent | null = null) {
      e?.preventDefault();
      e?.stopPropagation();

      this.$patch((state) => {
        state.modal = !state.modal;
      });
    },
  },
  getters: {
    isModalOpen: (state) => state.modal,
  },
  state: () => ({
    modal: false,
  }),
});
