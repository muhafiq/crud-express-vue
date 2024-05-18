<script setup>
import DashboardHeader from "@/components/dashboard/DashboardHeader.vue";
import DashboardFooter from "@/components/dashboard/DashboardFooter.vue";
import PopUpNotification from "@/components/PopUpNotification.vue";
import PostCardList from "@/components/dashboard/PostCardList.vue";
import { jwtDecode } from "jwt-decode";
import { useNotificationStore } from "@/stores/notification";
import { onMounted, ref } from "vue";
import { useFetch } from "@/composables/useFetch";

const user = ref(jwtDecode(JSON.parse(localStorage.getItem("user")).accessToken));

const posts = ref();

const { data, error, fetchData } = useFetch(`/post/${user.value.userId}`, { auth: true });

onMounted(async () => {
  await getPosts();
});

async function getPosts() {
  await fetchData();
  if (error.value) {
    return;
  }
  posts.value = data.value.data;
}

const notificationStore = useNotificationStore();
</script>

<template>
  <DashboardHeader />
  <main class="bg-white h-screen flex justify-center items-center">
    <!-- notif -->
    <PopUpNotification
      v-if="notificationStore.firstAccess"
      :message="'Welcome to the Dashboard'"
      :process="true"
    />

    <!-- content -->
    <div class="w-4/5 mx-auto px-4 py-8 bg-gray-100 rounded-md shadow-sm">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-3xl font-semibold text-gray-700">Posts</h2>
        <router-link
          to="/dashboard/posts/create"
          class="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
          >Create Post</router-link
        >
      </div>
      <div>
        <table class="w-full table-auto">
          <thead v-if="posts" class="bg-gray-200">
            <tr>
              <th class="px-4 py-2 text-center text-gray-600">PostId</th>
              <th class="px-4 py-2 text-center text-gray-600 min-w-96">Title</th>
              <th class="px-4 py-2 text-center text-gray-600">Created At</th>
              <th class="px-4 py-2 text-center text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody v-if="posts">
            <PostCardList
              @reload="getPosts"
              :user="user"
              v-for="post in posts"
              :key="post.postId"
              :post="post"
            />
          </tbody>
          <div v-else class="text-xl font-bold text-center">No posts.</div>
        </table>
      </div>
    </div>
  </main>
  <DashboardFooter />
</template>
