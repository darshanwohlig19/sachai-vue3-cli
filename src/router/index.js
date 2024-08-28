import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Category from "../views/Category.vue";
import Login from "../views/Login.vue";
import Aboutus from "../views/Aboutus.vue";
import Astrology from "../views/Astrology.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/categories/:slugOrId",
    name: "Category",
    component: Category,
    props: true,
  },
  { path: "/login", component: Login, meta: { requiresAuth: false } },
  {
    path: "/AboutUs",
    name: "About",
    component: Aboutus,
  },
  {
    path: "/Astrology",
    name: "Astrology",
    component: Astrology,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("apiDataToken");

  // Check if the route requires authentication
  if (to.meta.requiresAuth && !isLoggedIn) {
    // Redirect to login if not authenticated
    next("/login");
  } else if (to.path === "/login" && isLoggedIn) {
    // Redirect to home if already logged in and trying to access login page
    next("/");
  } else {
    // Allow navigation to other routes
    next();
  }
});
export default router;
