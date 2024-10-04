import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Category from "../views/Category.vue";
import Login from "../views/Login.vue";
import Aboutus from "../views/Aboutus.vue";
import Astrology from "../views/Astrology.vue";
import News from "../components/IdData.vue";
import Bookmark from "../views/Bookmark.vue";
import Setting from "../views/Setting.vue";
import MoreNews from "../views/MoreNews.vue";
import NewsByTopics from "../views/NewsByTopics.vue";
import SearchForMobile from "@/views/SearchForMobile.vue";
import Campaign from "@/views/CampaignPage.vue";
import Latest from "@/views/LatestPage.vue";
import FeaturedNews from "@/components/RelatedNews.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/Setting",
    name: "Setting",
    component: Setting,
    meta: { requiresAuth: true },
  },
  {
    path: "/categories/:slugOrId",
    name: "Category",
    component: Category,
    props: true,
  },
  {
    path: "/news/:id",
    name: "news",
    component: News,
    props: true,
  },
  { path: "/login", component: Login, meta: { requiresAuth: false } },
  {
    path: "/AboutUs",
    name: "About",
    component: Aboutus,
  },
  {
    path: "/Bookmark",
    name: "Bookmark",
    component: Bookmark,
    meta: { requiresAuth: true },
  },
  {
    path: "/Astrology",
    name: "Astrology",
    component: Astrology,
    meta: { requiresAuth: true },
  },
  {
    path: "/MoreNews",
    name: "MoreNews",
    component: MoreNews,
  },
  {
    path: "/NewsByTopics/:topic",
    name: "NewsByTopics",
    component: NewsByTopics,
  },
  {
    path: "/search",
    name: "Search",
    component: SearchForMobile,
  },
  {
    path: "/Campaign",
    name: "Campaign",
    component: Campaign,
  },
  {
    path: "/Latest",
    name: "Latest",
    component: Latest,
  },
  {
    path: "/featured-news",
    name: "FeaturedNews",
    component: FeaturedNews,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  const apiDataToken = localStorage.getItem("apiDataToken");
  if (to.meta.requiresAuth && !apiDataToken) {
    next("/login");
  } else if (to.path === "/login" && apiDataToken) {
    next("/");
  } else if (to.path === "/Astrology" && !apiDataToken) {
    next("/");
  } else if (to.path === "/Setting" && !apiDataToken) {
    next("/");
  } else if (to.path === "/Bookmark" && !apiDataToken) {
    next("/");
  } else {
    next();
  }
});

export default router;
