<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useFetch } from "@/composables/useFetch";

defineProps({
  search: {
    type: Boolean,
    default: true,
  },
});

const router = useRouter();
const err = ref({});

const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

async function logout() {
  const { error, fetchData } = useFetch("/auth/logout", { auth: false, method: "DELETE" });
  await fetchData();
  if (error.value) {
    err.value = error.value;
    return;
  }
  localStorage.clear();
  router.push({ name: "login" });
}
</script>

<template>
  <header class="flex justify-between items-center px-12 py-4 bg-white shadow-md relative z-10">
    <div class="flex items-center gap-4">
      <RouterLink to="/dashboard" class="text-2xl font-bold text-emerald-600 select-none"
        >Dashboard</RouterLink
      >
    </div>
    <form v-if="search" @submit.prevent="" class="relative">
      <input
        type="text"
        placeholder="Search..."
        class="py-1 px-2 rounded-full border-[1px] focus:outline-none focus:ring focus:ring-emerald-600"
      />
      <button class="absolute right-3 top-1/2 -translate-y-1/2">
        <i class="fa-solid fa-search"></i>
      </button>
    </form>
    <div
      @click="toggleDropdown"
      class="flex items-center gap-2 py-1 px-2 rounded-md border-[1px] cursor-pointer relative"
    >
      <i class="fa-solid fa-circle-user text-2xl"></i>
      <i class="fa-solid fa-angle-down"></i>

      <div
        :class="[
          { hidden: !showDropdown },
          'absolute top-full right-0 w-48 bg-white shadow-md rounded-md py-2',
        ]"
      >
        <RouterLink
          to="/profile"
          class="block px-4 py-2 hover:bg-emerald-600 hover:text-white duration-200 select-none"
          >Profile</RouterLink
        >
        <span
          @click="logout"
          class="block px-4 py-2 hover:bg-emerald-600 hover:text-white duration-200 select-none"
          >Logout</span
        >
      </div>
    </div>
  </header>
</template>
