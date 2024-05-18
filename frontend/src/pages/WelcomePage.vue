<script setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    router.push("/login");
  }, 6000);
});
</script>

<template>
  <main class="bg-white flex flex-col gap-4 items-center justify-center h-screen">
    <img class="h-1/3" src="@/assets/images/welcome.svg" alt="welcome" />
    <h1 class="text-4xl font-bold text-center pb-4 border-b-[1px]">Welcome to the app.</h1>
    <p>You'll be redirect to login page soon.</p>
  </main>
</template>
