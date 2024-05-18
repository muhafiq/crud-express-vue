<script setup></script>

<template>
  <header class="flex justify-between items-center px-12 py-4 bg-white shadow-md relative z-10">
    <RouterLink to="/" class="text-3xl font-bold text-emerald-600">LOGO</RouterLink>
    <nav class="flex items-center gap-4">
      <RouterLink
        :class="[
          { 'text-emerald-600': $route.path === '/' },
          'font-medium hover:text-emerald-600 duration-200',
        ]"
        to="/"
        >Home</RouterLink
      >
      <RouterLink
        :class="[
          { 'text-emerald-600': $route.path === '/login' },
          'font-medium hover:text-emerald-600 duration-200',
        ]"
        to="/login"
        >Login</RouterLink
      >
      <RouterLink
        :class="[
          { 'text-emerald-600': $route.path === '/register' },
          'font-medium hover:text-emerald-600 duration-200',
        ]"
        to="/register"
        >Sign Up</RouterLink
      >
    </nav>
  </header>
</template>
