<template>
  <footer class="bg-gray-200 py-6 px-32">
    <div class="flex justify-between items-center py-8">
      <div>
        <RouterLink to="/" class="text-3xl font-bold text-emerald-600">LOGO</RouterLink>
        <p>All rights reserved.</p>
      </div>
      <div class="flex items-center gap-4">
        <RouterLink class="font-medium hover:text-emerald-600 duration-200" to="/">Home</RouterLink>
        <RouterLink class="font-medium hover:text-emerald-600 duration-200" to="/login"
          >Login</RouterLink
        >
        <RouterLink class="font-medium hover:text-emerald-600 duration-200" to="/register"
          >Sign Up</RouterLink
        >
      </div>
    </div>
    <div class="text-center py-8 border-t-[1px] border-emerald-600">
      <p class="text-sm text-gray-500">
        &copy; 2024 <span class="text-emerald-600">LOGO</span>. All rights reserved.
      </p>
    </div>
  </footer>
</template>
