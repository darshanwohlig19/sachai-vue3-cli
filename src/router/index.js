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
import TermsandCondition from "../views/TermsandCondition.vue";
import PrivacyPolicy from "../views/PrivacyPolicy.vue";
import Profile from "../views/Profile.vue";

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
  },
  {
    path: "/Astrology",
    name: "Astrology",
    component: Astrology,
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
    path: "/Terms&Condition",
    name: "TermsandCondition",
    component: TermsandCondition,
  },
  {
    path: "/PrivacyPolicy",
    name: "PrivacyPolicy",
    component: PrivacyPolicy,
  },
  {
    path: "/Profile",
    name: "Profile",
    component: Profile,
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
