import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Category from "../views/Category.vue";
import Login from "../views/Login.vue";
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
  {
    path: "/Login",
    name: "Login",
    component: Login,
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

export default router;
