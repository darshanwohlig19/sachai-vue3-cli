import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Category from "../views/Category.vue";
import Login from "../views/Login.vue";
import Aboutus from "../views/Aboutus.vue";

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
    path: "/AboutUs",
    name: "About",
    component: Aboutus,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
