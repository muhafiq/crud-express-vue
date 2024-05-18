<script setup>
import DashboardHeader from "@/components/dashboard/DashboardHeader.vue";
import DashboardFooter from "@/components/dashboard/DashboardFooter.vue";
import { ref } from "vue";
import { useFetch } from "@/composables/useFetch";
import router from "@/router";

const dataPost = ref({
  title: "",
  content: "",
});

const { error, fetchData } = useFetch("/post/create", {
  auth: true,
  method: "POST",
  body: dataPost.value,
});

async function handleSubmit() {
  await fetchData();
  if (error.value) return;
  router.push({ name: "dashboard" });
}
</script>

<template>
  <DashboardHeader />
  <main class="min-h-screen justify-center items-center py-8">
    <div class="max-w-xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-green-600">Create a New Post</h2>
      <form @submit.prevent="handleSubmit">
        <div v-if="error">
          <p class="text-sm text-red-600">{{ error.message }}</p>
        </div>
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input
            v-model="dataPost.title"
            type="text"
            id="title"
            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600"
            required
          />
        </div>
        <div class="mb-4">
          <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            v-model="dataPost.content"
            id="content"
            rows="5"
            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600"
            required
          ></textarea>
        </div>
        <div class="flex justify-end">
          <button
            type="submit"
            class="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </main>
  <DashboardFooter />
</template>
