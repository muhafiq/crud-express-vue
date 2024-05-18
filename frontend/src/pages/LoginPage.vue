<script setup>
import PageHeader from "@/components/PageHeader.vue";
import PageFooter from "@/components/PageFooter.vue";

import { useRouter } from "vue-router";
import { ref } from "vue";
import { useNotificationStore } from "@/stores/notification";
import { useFetch } from "@/composables/useFetch";

const router = useRouter();
const notificationStore = useNotificationStore();
const dataLogin = ref({
  email: "",
  password: "",
});

const { data, error, fetchData } = useFetch("/auth/login", {
  method: "POST",
  auth: false,
  body: dataLogin.value,
});

async function handleSubmit() {
  await fetchData();
  if (error.value) {
    if (error.value?.message.includes("8 characters long")) {
      error.value.message = "Invalid email or password!";
    }
    return;
  }

  localStorage.setItem("user", JSON.stringify({ accessToken: data.value.accessToken }));
  notificationStore.setFirstAccess(true);
  router.push("/dashboard");
}
</script>

<template>
  <PageHeader />
  <main class="h-screen bg-white">
    <div class="flex justify-center items-center h-full">
      <div class="w-1/4 h-max py-12 bg-gray-200 shadow-lg rounded-lg p-4">
        <h1
          class="text-2xl font-bold text-emerald-600 text-center pb-4 border-b-[1px] border-emerald-600"
        >
          Login to your account
        </h1>
        <form @submit.prevent="handleSubmit" class="flex flex-col items-center gap-4 mt-12">
          <div v-if="error" class="text-red-500 text-sm text-center">
            {{ error.message }}
          </div>
          <div>
            <label for="email" class="relative w-full">
              <i
                class="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-xl text-emerald-600"
              ></i>
              <input
                v-model="dataLogin.email"
                type="email"
                id="email"
                class="shadow-sm py-3 px-10 rounded-full outline-none w-full"
                placeholder="Email..."
                autocomplete="off"
              />
            </label>
          </div>
          <div>
            <label for="password" class="relative w-full">
              <i
                class="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-xl text-emerald-600"
              ></i>
              <input
                v-model="dataLogin.password"
                type="password"
                id="password"
                class="shadow-sm py-3 px-10 rounded-full outline-none w-full"
                placeholder="Password..."
                autocomplete="off"
              />
            </label>
          </div>

          <button
            class="self-center px-4 py-2 rounded-md bg-emerald-600 text-white font-bold shadow-sm select-none hover:bg-emerald-700 duration-200"
          >
            Login
          </button>
          <p class="text-sm">
            Don't have account?
            <RouterLink
              class="text-emerald-600 hover:underline hover:text-emerald-700"
              to="/register"
              >Sign Up</RouterLink
            >
          </p>
        </form>
      </div>
    </div>
  </main>
  <PageFooter />
</template>
