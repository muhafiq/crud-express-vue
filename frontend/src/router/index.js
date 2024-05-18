import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import ProfilePage from "../pages/ProfilePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
      meta: {
        public: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../pages/LoginPage.vue"),
      meta: {
        public: true,
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../pages/RegisterPage.vue"),
      meta: {
        public: true,
      },
    },
    {
      path: "/welcome",
      name: "welcome",
      component: () => import("../pages/WelcomePage.vue"),
      meta: {
        public: true,
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      meta: {
        title: "Dashboard",
        auth: true,
      },
      component: () => import("../pages/DashboardPage.vue"),
    },
    {
      path: "/dashboard/posts/create",
      name: "create-post",
      meta: {
        auth: true,
        title: "Create New Post",
      },
      component: () => import("../pages/CreatePost.vue"),
    },
    {
      path: "/dashboard/posts/edit/:postId",
      name: "edit-post",
      meta: {
        auth: true,
        title: "Edit Your Post",
      },
      component: () => import("../pages/EditPost.vue"),
    },
    {
      path: "/@:user/post/:postId",
      name: "view-post",
      meta: {
        auth: false,
        title: "Post",
      },
      component: () => import("../pages/ViewPost.vue"),
    },
    {
      path: "/test",
      name: "test",
      meta: {
        title: "test",
        auth: true,
      },
      component: () => import("../components/PopUpConfirmation.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      meta: {
        title: "Profile",
        auth: true,
      },
      component: ProfilePage,
    },

    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

router.beforeEach((to, from, next) => {
  const title = to.meta.title || "Basic Crud Express & Vue Js";
  document.title = title;

  if (to.name === "not-found") {
    return next({ name: "home" });
  }

  if (to.meta.auth && !localStorage.getItem("user")) {
    return next({ name: "login" });
  }

  if (
    (to.name === "login" || to.name === "register" || to.name === "welcome") &&
    localStorage.getItem("user")
  ) {
    return next({ name: "dashboard" });
  }

  next();
});

export default router;
