<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import PopUpConfirmation from "@/components/PopUpConfirmation.vue";
import { formatDate } from "@/utils/format";

defineProps({
  post: {
    type: Object,
  },
  user: {
    type: Object,
  },
});

const emit = defineEmits(["reload"]);

const showPopUp = ref(false);

function openClose() {
  showPopUp.value = !showPopUp.value;
  emit("reload");
}
</script>

<template>
  <tr class="border-t">
    <td class="px-4 py-2 text-gray-700">{{ post.postId }}</td>
    <td class="px-4 py-2 text-gray-700">
      {{ post.title }}
      <RouterLink
        :to="{ name: 'view-post', params: { user: user.username, postId: post.postId } }"
        target="_blank"
      >
        <i class="fa-solid fa-arrow-up-right-from-square hover:text-green-600"></i>
      </RouterLink>
    </td>
    <td class="px-4 py-2 text-gray-700">{{ formatDate(post.createdAt) }}</td>
    <td class="px-4 py-2 flex justify-center items-center gap-4">
      <RouterLink
        :to="{ name: 'edit-post', params: { postId: post.postId } }"
        class="inline-block bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition duration-300"
      >
        Update
      </RouterLink>
      <button
        @click="openClose"
        class="inline-block bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition duration-300"
      >
        Delete
      </button>
    </td>
    <PopUpConfirmation
      :is-open="showPopUp"
      :message="'Are you sure want to delete?'"
      @close="openClose"
      :postId="post.postId"
    />
  </tr>
</template>
