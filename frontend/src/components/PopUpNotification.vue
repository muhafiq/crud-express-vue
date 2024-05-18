<script setup>
import { onMounted, reactive } from "vue";
import { useNotificationStore } from "@/stores/notification";

const notificationStore = useNotificationStore();

const show = reactive({
  pre: true,
  post: true,
});

defineProps({
  process: Boolean,
  error: Boolean,
  message: String,
});

onMounted(() => {
  setTimeout(() => {
    show.pre = false;
  }, 3000);
  setTimeout(() => {
    show.post = false;
    notificationStore.setFirstAccess(false);
  }, 3050);
});
</script>

<template>
  <div
    v-if="show.post"
    :class="show.pre ? 'right-4' : '-right-full'"
    class="absolute right-4 top-24 flex items-center justify-center duration-300"
  >
    <div class="flex items-center gap-4 bg-white p-4 rounded-lg shadow-lg">
      <i
        :class="[
          { 'fa-circle-check text-green-600': process, 'fa-circle-mark text-red-600': error },
          'text-2xl fa-solid',
        ]"
      ></i>
      <h2 class="text-lg font-semibold text-gray-800">{{ message }}</h2>
    </div>
  </div>
</template>
