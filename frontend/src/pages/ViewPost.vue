<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import DashboardHeader from "@/components/dashboard/DashboardHeader.vue";
import DashboardFooter from "@/components/dashboard/DashboardFooter.vue";
import { useFetch } from "@/composables/useFetch";
import { formatDate } from "@/utils/format";

const route = useRoute();
const post = ref(null);

const { data, error, fetchData } = useFetch(`/post/single/${route.params.postId}`, {
  auth: false,
});

onMounted(async () => {
  await fetchData();
  if (error.value) return;
  post.value = data.value.data;
});
</script>

<template>
  <DashboardHeader :search="false" />
  <main class="min-h-screen flex justify-center items-center">
    <div v-if="error">
      <p>Sorry we cannot, display this content.</p>
      <p>{{ error.message }}</p>
    </div>
    <div v-else class="max-w-5xl p-6 bg-gray-100 rounded-lg shadow-md">
      <article v-if="post">
        <header class="mb-4">
          <h1 class="text-3xl font-bold text-green-600 mb-2">{{ post.title }}</h1>
          <p class="text-sm text-gray-500">
            Posted by @{{ post.author.username }} on {{ formatDate(post.createdAt) }}
          </p>
        </header>
        <section class="text-gray-700">
          <p class="mb-4">{{ post.content }}</p>
        </section>
      </article>
      <div v-else class="text-gray-700">Loading...</div>
    </div>
  </main>
  <DashboardFooter />
</template>
