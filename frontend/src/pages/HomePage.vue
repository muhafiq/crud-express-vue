<script setup>
import PageHeader from "@/components/PageHeader.vue";
import PageFooter from "@/components/PageFooter.vue";
import { ref } from "vue";
import { formatDate } from "@/utils/format";
import { useFetch } from "@/composables/useFetch";

const query = ref("");

const posts = ref([]);

async function search() {
  const { data, error, fetchData } = useFetch(`/post/search?q=${query.value}`, { auth: false });
  await fetchData();
  if (error.value) {
    console.log(error.value);
    return;
  }
  posts.value = data.value.data;
}
</script>

<template>
  <PageHeader />
  <main class="min-h-screen h-max bg-white py-8 px-16 flex flex-col justify-center items-center">
    <form @submit.prevent="search" class="w-2/3 max-w-4xl relative mb-16">
      <i class="fa-solid fa-magnifying-glass text-2xl absolute left-6 top-1/2 -translate-y-1/2"></i>
      <input
        v-model="query"
        class="w-full text-xl font-semibold px-16 py-6 rounded-full bg-gray-100 shadow-md outline-green-600"
        type="text"
        id="search"
        placeholder="Search post..."
      />
    </form>
    <div
      v-if="posts.length > 0"
      class="flex flex-col gap-2 p-8 bg-gray-100 w-full min-h-screen rounded-lg shadow"
    >
      <div
        v-for="post in posts"
        :key="post.postId"
        class="flex justify-between items-center gap-4 bg-white rounded-sm shadow-sm p-8"
      >
        <div>
          <h1 class="text-xl font-bold text-green-600">{{ post.title }}</h1>
          <p class="text-sm text-gray-500">
            Posted by @{{ post.author.username }} on {{ formatDate(post.createdAt) }}
          </p>
        </div>
        <RouterLink
          :to="{ name: 'view-post', params: { user: post.author.username, postId: post.postId } }"
          target="_blank"
        >
          <i class="fa-solid fa-arrow-up-right-from-square hover:text-green-600"></i>
        </RouterLink>
      </div>
    </div>
    <div v-else class="text-center p-8 bg-gray-100 w-full min-h-screen rounded-lg shadow">
      No posts found, or try another keyword
    </div>
  </main>
  <PageFooter />
</template>
