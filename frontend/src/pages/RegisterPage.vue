<script setup>
import { reactive } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import PageFooter from "@/components/PageFooter.vue";
import { useRouter } from "vue-router";
import { useFetch } from "@/composables/useFetch";

const router = useRouter();
const dataRegister = reactive({
  name: "",
  username: "",
  email: "",
  password: "",
  confPassword: "",
});

const { error, fetchData } = useFetch("/auth/register", {
  auth: false,
  method: "POST",
  body: dataRegister,
});

async function handleSubmit() {
  await fetchData();
  if (error.value) {
    if (error.value?.message.includes("ref")) {
      error.value.message = "Password and confirm password must match!";
    }
    return;
  }
  router.push({ name: "welcome" });
}
</script>

<template>
  <PageHeader />
  <main class="h-max p-10 bg-white">
    <div class="flex justify-center items-center h-full">
      <div class="w-1/3 h-max py-12 bg-gray-200 shadow-lg rounded-lg p-4">
        <h1
          class="text-2xl font-bold text-emerald-600 text-center pb-4 border-b-[1px] border-emerald-600"
        >
          Register new account
        </h1>
        <form @submit.prevent="handleSubmit" class="flex flex-col items-center gap-4 mt-12">
          <div v-if="error" class="text-red-500 text-sm text-center">
            {{ error.message }}
          </div>
          <div>
            <label for="name" class="relative w-full">
              <i
                class="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-xl text-emerald-600"
              ></i>
              <input
                v-model="dataRegister.name"
                type="text"
                id="name"
                class="shadow-sm py-3 px-10 rounded-full outline-none w-full"
                placeholder="Name..."
                autocomplete="off"
                required
              />
            </label>
          </div>
          <div>
            <label for="username" class="relative w-full">
              <i
                class="fa-solid fa-id-badge absolute left-4 top-1/2 -translate-y-1/2 text-xl text-emerald-600"
              ></i>
              <input
                v-model="dataRegister.username"
                type="text"
                id="username"
                class="shadow-sm py-3 px-10 rounded-full outline-none w-full"
                placeholder="Username..."
                autocomplete="off"
                required
              />
            </label>
          </div>
          <div>
            <label for="email" class="relative w-full">
              <i
                class="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-xl text-emerald-600"
              ></i>
              <input
                v-model="dataRegister.email"
                type="email"
                id="email"
                class="shadow-sm py-3 px-10 rounded-full outline-none w-full"
                placeholder="Email..."
                autocomplete="off"
                required
              />
            </label>
          </div>
          <div>
            <label for="password" class="relative w-full">
              <i
                class="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-xl text-emerald-600"
              ></i>
              <input
                v-model="dataRegister.password"
                type="password"
                id="password"
                class="shadow-sm py-3 px-10 rounded-full outline-none w-full"
                placeholder="Password..."
                autocomplete="off"
                required
              />
            </label>
          </div>
          <div>
            <label for="confPassword" class="relative w-full">
              <i
                class="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-xl text-emerald-600"
              ></i>
              <input
                v-model="dataRegister.confPassword"
                type="password"
                id="confPassword"
                class="shadow-sm py-3 px-10 rounded-full outline-none w-full"
                placeholder="Confirmation password..."
                autocomplete="off"
                required
              />
            </label>
          </div>

          <button
            class="self-center px-4 py-2 rounded-md bg-emerald-600 text-white font-bold shadow-sm select-none hover:bg-emerald-700 duration-200"
          >
            Sign Up
          </button>
          <p class="text-sm">
            Already have account?
            <RouterLink class="text-emerald-600 hover:underline hover:text-emerald-700" to="/login"
              >Sign In</RouterLink
            >
          </p>
        </form>
      </div>
    </div>
  </main>
  <PageFooter />
</template>
