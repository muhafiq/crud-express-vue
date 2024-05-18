import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotificationStore = defineStore("notification", () => {
  const firstAccess = ref(false);

  const setFirstAccess = (value) => {
    firstAccess.value = value;
  };

  return {
    firstAccess,
    setFirstAccess,
  };
});
