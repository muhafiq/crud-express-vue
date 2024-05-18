<script setup>
import { useFetch } from "@/composables/useFetch";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Confirmation",
  },
  message: {
    type: String,
    default: "Are you sure you want to proceed?",
  },
  postId: {
    type: String,
  },
});

const emit = defineEmits(["close"]);

const { error, fetchData } = useFetch(`/post/delete/${props.postId}`, {
  auth: true,
  method: "DELETE",
});

async function handleConfirm() {
  await fetchData();
  if (error.value) return;
  emit("close");
  router.push({ name: "dashboard" });
}

function handleCancel() {
  emit("close");
}
</script>

<template>
  <div
    v-if="isOpen"
    class="top-0 left-0 w-full h-screen flex justify-center items-center absolute z-10 bg-black bg-opacity-30"
  >
    <div
      class="flex flex-col justify-evenly min-w-48 w-1/4 h-1/4 bg-white absolute z-20 shadow-md rounded-md p-4"
    >
      <h1 class="text-lg font-bold text-green-600">{{ title }}</h1>
      <p>{{ message }}</p>
      <div class="flex justify-end items-center gap-2">
        <button
          @click="handleCancel"
          class="px-4 py-2 text-sm rounded-md bg-red-600 text-white font-bold hover:bg-red-800 duration-300"
        >
          Cancel
        </button>
        <button
          @click="handleConfirm"
          class="px-4 py-2 text-sm rounded-md bg-green-600 text-white font-bold hover:bg-green-800 duration-300"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>
