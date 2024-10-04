<template>
  <div>
    <div
      class="w-[100%] h-[67px] bg-white rounded-b-[20px] shadow-[0px_4px_6px_rgba(240,0,0,0.2)] justify-between flex items-center pl-4 pr-4 fixed inset-0 z-50 bg-opacity-50"
    >
      <div class="">
        <a href="/">
          <img
            class="h-[20px] w-[78px] object-cover"
            src="https://uploads-ssl.webflow.com/64ae7a0260c324b7e56ab6b5/64b653319dad7b8061b00de2_sachai-logo.webp"
          />
        </a>
      </div>
      <div class="w-[70%]">
        <div class="flex gap-1 sm:gap-3 items-center justify-end">
          <div class="hidden lg:flex head-navs gap-2">
            <!-- <a href="/">Home</a> -->
            <img
              v-if="route.path === '/'"
              src="@/assets/svg/active_home.svg"
              alt="Active Home Image"
            />
            <img v-else src="@/assets/svg/Home.svg" alt="Home Image" />
            <RouterLink class="nav-items" active-class="active-link" to="/"
              >Home</RouterLink
            >
          </div>
          <div class="hidden lg:flex head-navs gap-2" v-if="isLoggedIn">
            <img
              v-if="route.path === '/Astrology'"
              src="@/assets/svg/active_astrology.svg"
              alt="Active Astrology Image"
            />
            <img
              v-else
              src="@/assets/svg/Astrology.svg"
              alt="Astrology Image"
            />

            <RouterLink
              class="nav-items"
              active-class="active-link"
              to="/Astrology"
              >Astrology</RouterLink
            >
            <!-- Astrology -->
          </div>

          <div
            class="relative lg-max:!hidden flex gap-2 cursor-pointer"
            @mouseover="showDropdown = true"
            @mouseleave="hideDropdown"
          >
            <img
              v-if="showDropdown"
              src="@/assets/svg/active_catogery.svg"
              alt="Active Category"
              height="14px"
              width="14px"
            />
            <img
              v-else
              src="@/assets/svg/category.svg"
              alt="Category"
              height="14px"
              width="14px"
            />
            <RouterLink
              class="nav-items hover:text-[var(--hover-color)]"
              to=""
              :style="{
                color: showDropdown ? '#FF0053' : hoverColor,
              }"
              >Category</RouterLink
            >
            <!-- <div class="nav-items" active-class="active-link">Category</div> -->
            <div
              v-if="showDropdown"
              @mouseover="showDropdown = true"
              @mouseleave="hideDropdown"
              class="absolute mt-4 bg-white border h-auto border-gray-300 rounded shadow-lg z-3"
            >
              <div class="w-[100%] flex">
                <!--  First Div  -->
                <div
                  class="shadow-[2px_0px_5px_rgba(240,0,0,0.2)] capitalize category-head rounded-r-lg w-[150px]"
                >
                  <ul>
                    <li
                      class="mt-1 p-2 ml-3 hover:text-[var(--hover-color)] hover:bg-[var(--hover-bg-color)]"
                      v-for="category in categories"
                      :key="category._id"
                      @mouseover="fetchCategoryFromLocalStorage(category._id)"
                      :style="{
                        '--hover-color': '#FF0053',
                        '--hover-bg-color': '#FFF2F6',
                      }"
                    >
                      <div class="flex items-center space-x-2">
                        <a
                          :href="`/categories/${category._id}?category=${category.name}`"
                          class="flex items-center"
                        >
                          <span>{{ category.name }}</span>
                          <div class="flex justify-center items-center">
                            <img
                              src="../assets/svg/triangle_arrow.svg"
                              class="ml-1"
                            />
                          </div>
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
                <!--   Second Div  -->

                <div v-if="newsItems.length > 0" class="p-3 w-[385px]">
                  <div
                    class="h-[203px] relative"
                    @click="navigateToTrending(newsItems[0]?._id)"
                  >
                    <img
                      class="h-[100%] w-full object-cover rounded-[10px]"
                      :src="newsItems[0]?.imgixUrlHighRes"
                    />
                    <div
                      class="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-[8px]"
                    ></div>
                    <div
                      class="absolute top-0 bottom-0 w-full h-full flex items-end justify-start"
                    >
                      <div class="text-white p-2 rounded-md w-[100%]">
                        <div
                          class="sub_category_head multiline-truncate-tow-tow-liner"
                        >
                          {{ newsItems[0]?.headline }}
                        </div>
                        <div class="flex flex-row gap-2 sub_category_summary">
                          <div>{{ newsItems[0]?.source }}</div>
                          <div>|</div>
                          <div>
                            {{ formatPublishTime(newsItems[0]?.publishTime) }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="w-[100%] flex flex-col justify-between"
                    @click="navigateToTrending(newsItems[1]?._id)"
                  >
                    <div class="mt-3">
                      <div
                        class="flex flex-row gap-3 p-2.5 drop-shadow-md border-1 rounded-[8px] items-center cursor-pointer"
                      >
                        <div class="w-[20%]">
                          <img
                            :src="newsItems[1]?.imgixUrlHighRes"
                            class="rounded-[6px] h-[65px] w-[65px] object-cover"
                            alt=""
                          />
                        </div>
                        <div class="flex flex-col w-[70%]">
                          <div
                            class="category-heading w-[100%] multiline-truncate-tow-tow-liner"
                          >
                            {{ newsItems[1]?.headline }}
                          </div>
                          <div
                            class="multiline-truncate-one-liner category-head-head w-[100%]"
                          >
                            {{ newsItems[1]?.summary }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="w-[100%] flex flex-col justify-between"
                    @click="navigateToTrending(newsItems[2]?._id)"
                  >
                    <div class="mt-3">
                      <div
                        class="flex flex-row gap-3 p-2.5 drop-shadow-md border-1 rounded-[8px] items-center cursor-pointer"
                      >
                        <div class="w-[20%]">
                          <img
                            :src="newsItems[2]?.imgixUrlHighRes"
                            class="rounded-[6px] h-[65px] w-[65px] object-cover"
                            alt=""
                          />
                        </div>
                        <div class="flex flex-col w-[70%]">
                          <div
                            class="category-heading w-[100%] multiline-truncate-tow-tow-liner"
                          >
                            {{ newsItems[2]?.headline }}
                          </div>
                          <div
                            class="multiline-truncate-one-liner category-head-head w-[100%]"
                          >
                            {{ newsItems[2]?.summary }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="w-[100%] mt-3 flex flex-col justify-between"
                    @click="navigateToTrending(newsItems[3]?._id)"
                  >
                    <div class="mt-4 md:mt-4 lg:mt-0 cursor-pointer">
                      <div class="flex flex-row gap-2">
                        <div class="w-[5%] mt-2">
                          <img src="../assets/png/Group.png" alt="" />
                        </div>
                        <div class="flex flex-col w-[100%]">
                          <div class="font-16 multi-line-2">
                            {{ newsItems[3]?.headline }}
                          </div>
                          <div class="para multiline-truncate-tow-tow-liner">
                            {{ newsItems[3]?.summary }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="w-[100%] mt-3 flex flex-col justify-between"
                    @click="navigateToTrending(newsItems[4]?._id)"
                  >
                    <div class="mt-0 cursor-pointer">
                      <div class="flex flex-row gap-2">
                        <div class="w-[5%] mt-2">
                          <img src="../assets/png/Group.png" alt="" />
                        </div>
                        <div class="flex flex-col w-[100%]">
                          <div class="font-16 multi-line-2">
                            {{ newsItems[4]?.headline }}
                          </div>
                          <div class="para multiline-truncate-tow-tow-liner">
                            {{ newsItems[4]?.summary }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="hidden lg:flex head-navs gap-2">
            <img
              v-if="route.path === '/Bookmark'"
              src="@/assets/svg/active_bookmark.svg"
              alt="Active Bookmark Image"
            />
            <img v-else src="@/assets/svg/Bookmark.svg" alt="Bookmark Image" />
            <RouterLink
              class="nav-items"
              active-class="active-link"
              to="/Bookmark"
              >Bookmark</RouterLink
            >
          </div>
          <div>
            <a
              href="#"
              class="nav-items hidden lg:flex head-navs gap-2"
              @click="handleAuthAction"
            >
              <img src="../assets/svg/Login.svg" alt="" />
              {{ isLoggedIn ? "Logout" : "Login" }}
            </a>
          </div>
          <div class="w-[421px] relative block lg-max:!hidden">
            <!-- @click="expandInput" -->
            <input
              type="text"
              id="fname"
              ref="searchInput"
              :class="inputClass"
              v-model="searchQuery"
              @input="handleSearch"
              name="fname"
              autocomplete="off"
              placeholder="Search"
              class="pr-10 pl-3 py-2 w-full font-[#1E0627] rounded-[100px] text-[12px] font-lato border-1"
            />
            <img
              src="../assets/svg/searchimage.svg"
              class="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
            <div
              v-if="searchResults.length"
              ref="searchResultsDropdown"
              class="absolute w-full bg-white p-2 border border-gray-300 rounded-md mt-2 z-10 h-[370px] overflow-y-auto slim-scrollbar"
            >
              <div
                v-if="loading"
                class="text-center py-2 text-gray-500 overflow-y-hidden"
              >
                <div class="flex flex-col gap-[13px] overflow-y-hidden">
                  <div
                    v-for="b in 4"
                    :key="b"
                    class="shadow-md flex gap-3 shadow-custom border-custom overflow-y-hidden w-full p-2 rounded-[8px]"
                  >
                    <div class="flex-shrink-0">
                      <Skeleton width="78px" height="57px"></Skeleton>
                    </div>
                    <div class="flex justify-center flex-col w-full">
                      <Skeleton width="100%" height="25px"></Skeleton>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-else
                v-for="(result, index) in searchResults"
                :key="index"
                class="flex gap-3 flex-row p-2 cursor-pointer hover:bg-gray-100 overflow-y-auto"
                @click="navigateToNewsDetail(result._id)"
              >
                <div
                  class="w-[100%] flex flex-row justify-between gap-3 shadow-custom border-custom rounded-[8px] p-2"
                  @click="navigateToNewsDetail(result._id)"
                >
                  <div class="w-[15%]">
                    <img
                      :src="result.imgixUrlHighRes || fallbackImage"
                      class="h-[54px] w-[56px] object-cover rounded-[8px]"
                    />
                  </div>
                  <div
                    class="w-[80%] flex justify-start items-center text-start font-light font-[#1E0627] font-source-serif text-[13px] two_line"
                  >
                    {{ result.headline }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <AutoComplete
            v-model="searchQuery"
            :suggestions="searchResults"
            @complete="handleSearch"
            class="w-[200px] border-1 h-[full]"
          /> -->
          <router-link
            class="md:hidden sm-max:block"
            to="/search"
          ></router-link>

          <a class="block lg:hidden">
            <div
              @click="visibleRight = true"
              class="h-[34px] w-[34px] rounded-full flex justify-center items-center shadow-md"
            >
              <img src="../assets/svg/category.svg" />
            </div>
            <Sidebar
              class="w-[30%] sm-425:w-[40%] h-[100%] rounded-l-[20px] block lg:hidden"
              v-model:visible="visibleRight"
              position="right"
              :closeIcon="true"
            >
              <div class="capitalize category-head rounded-l-lg w-[150px]">
                <ul>
                  <li
                    class="mt-1 p-2 ml-3 text-black hover:text-[var(--hover-color)] hover:bg-[var(--hover-bg-color)]"
                    v-for="category in categories"
                    :key="category._id"
                    @mouseover="fetchCategoryFromLocalStorage(category._id)"
                    :style="{
                      '--hover-color': '#FF0053',
                      '--hover-bg-color': '#FFF2F6',
                    }"
                  >
                    <div class="flex items-center space-x-2">
                      <a
                        :href="`/categories/${category._id}?category=${category.name}`"
                        class="flex items-center"
                      >
                        <span>{{ category.name }}</span>
                        <img
                          src="../assets/svg/triangle_arrow.svg"
                          class="ml-1"
                        />
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </Sidebar>
            <!-- <div
              class="relative flex gap-2 cursor-pointer"
              @mouseover="showDropdown = true"
              @mouseleave="hideDropdown"
            >
              <div
                class="h-[34px] w-[34px] rounded-full flex justify-center items-center shadow-md"
              >
                <img src="../assets/svg/category.svg" />
              </div>

              <div
                v-if="showDropdown"
                @mouseover="showDropdown = true"
                @mouseleave="hideDropdown"
                class="absolute mt-5 flex justify-end bg-white border h-auto border-gray-300 rounded shadow-lg z-3"
              >
                <div class="w-[100%] flex">
                  <div class="capitalize category-head rounded-l-lg w-[150px]">
                    <ul>
                      <li
                        class="mt-3 ml-3 hover:text-[var(--hover-color)] hover:bg-[var(--hover-bg-color)]"
                        v-for="category in categories"
                        :key="category._id"
                        @mouseover="fetchCategoryFromLocalStorage(category._id)"
                        :style="{
                          '--hover-color': '#FF0053',
                          '--hover-bg-color': '#FF005333',
                        }"
                      >
                        <div class="flex items-center space-x-2">
                          <a
                            :href="`/categories/${category._id}?category=${category.name}`"
                            class="flex items-center"
                          >
                            <span>{{ category.name }}</span>
                            <img
                              src="../assets/svg/triangle_arrow.svg"
                              class="ml-1"
                            />
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> -->
          </a>
          <button class="lg:hidden block" @click="$router.push('/search')">
            <div
              class="h-[34px] w-[34px] rounded-full flex justify-center items-center shadow-md"
            >
              <img src="../assets/svg/search.svg" alt="Search" />
            </div>
          </button>

          <button
            v-if="isLoggedIn"
            @click="$router.push('/Setting')"
            class="h-[34px] w-[34px] rounded-full flex justify-center items-center shadow-md"
          >
            <img
              v-if="route.path === '/Setting'"
              src="@/assets/svg/active_setting.svg"
              alt="Active Setting Image"
            />
            <img v-else src="@/assets/svg/Settings.svg" alt="Setting Image" />
          </button>
          <button
            v-if="isLoggedIn"
            class="h-[34px] w-[34px] rounded-full flex justify-center items-center shadow-md"
          >
            <img
              v-if="route.path === '/Profile'"
              src="@/assets/svg/active_account.svg"
              alt="Active Account Image"
            />
            <img v-else src="@/assets/svg/Account.svg" alt="Account Image" />
          </button>

          <div
            class="h-[34px] w-[34px] flex justify-center items-center lg:hidden"
            @click="toggleCardDropdown"
          >
            <i class="pi pi-bars"></i>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isCardDropdownOpen"
      class="right-0 w-[192px] bg-white rounded-md shadow-lg z-10 h-full fixed position: fixed; height: 100%; width: 100%; left: 0px; top: 0px; display: flex; justify-content: flex-end; align-items: center; z-index: 1101; rounded-l-[20px]"
    >
      <div class="py-1">
        <RouterLink
          to="/"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 nav-items"
          active-class="active-link"
          >Home</RouterLink
        >
        <RouterLink
          to="/Astrology"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 nav-items"
          active-class="active-link"
          v-if="isLoggedIn"
          >Astrology</RouterLink
        >
        <RouterLink
          to="/Bookmark"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 nav-items"
          active-class="active-link"
          >Bookmark</RouterLink
        >
        <a
          href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer nav-items"
          @click="handleAuthAction"
        >
          {{ isLoggedIn ? "Logout" : "Login" }}
        </a>
      </div>
    </div>
    <!-- <div
      class="w-full h-[67px] mt-1 flex justify-between bg-white items-center relative lg:overflow-x-hidden"
    >
      <i
        class="pi pi-angle-left ml-2 cursor-pointer block md:hidden"
        @click="scrollLeft"
      ></i>
      <div
        class="flex items-center justify-between space-x-3 px-2 py-0 flex-1 overflow-x-auto custom-scrollbar lg:overflow-x-hidden whitespace-nowrap"
        ref="categoriesContainer"
      >
        <div
          v-for="heading in categories"
          :key="heading._id"
          class="flex-shrink-0"
        >
          <a
            :href="`/categories/${heading._id}?category=${heading.name}`"
            class="no-underline"
          >
            <Chip
              class="bg-transparent border-1 border-[#D4D4D4] capitalize head-cat"
              :label="heading.name"
            />
          </a>
        </div>
      </div>

      <i
        class="pi pi-angle-right mr-2 cursor-pointer block md:hidden"
        @click="scrollRight"
      ></i>
    </div> -->

    <!-- Popup Confirmation -->
    <div
      v-if="isPopupVisible"
      class="fixed inset-0 flex items-center justify-center pop-up-confirm bg-opacity-50 z-50 bg-[#000000b0]"
      @click="handleBackgroundClick"
    >
      <div class="bg-white p-5 sm:p-6 rounded-[18px] shadow-lg" @click.stop>
        <p class="mt-2 text-[#121212] font-lato font-bold font-[24px]">
          Are you sure you want to logout?
        </p>
        <div class="flex flex-col gap-3 justify-center mt-4">
          <div class="flex justify-center items-center">
            <button
              :disabled="isLoggingOut"
              @click="handleLogout"
              class="bg-[#1E0627] font-lato text-white px-4 h-[52px] w-[200px] py-2 rounded-[18px]"
            >
              Yes, Logout
            </button>
          </div>
          <button @click="hidePopup" class="text-#000 font-lato">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import apiService from "@/services/apiServices";
import apiConfig from "@/common/config/apiConfig";
import { onBeforeUnmount, onMounted, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { getAuth, signOut } from "firebase/auth";
import { useToast } from "primevue/usetoast";
import moment from "moment"; // Import moment.js
import { useRoute } from "vue-router";
import fallbackImage2 from "../common/config/GlobalConstants";
const fallbackImage = fallbackImage2.variables.fallbackImage;
// const isMenuOpen = ref(false);
// const isDropdownOpen = ref(false);
const route = useRoute();
const categories = ref([]);
const visibleRight = ref(false);
const newsItems = ref([]);
const categoryWise = ref([]);
console.log("hiiǐ", categoryWise);
const isLoggedIn = ref(!!localStorage.getItem("apiDataToken"));
// const showBookmarkLink = ref(true);
const isPopupVisible = ref(false);
const isExpanded = ref(false);
const searchInput = ref(null);
const searchResultsDropdown = ref(null);
const router = useRouter();
const loading = ref(true);
const toast = useToast();
// const categoriesContainer = ref(null);
const isLoggingOut = ref(false);
const isCardDropdownOpen = ref(false);
const categoryId = "63d90f8aaabaf4bf0169c2b0";
// const isInputVisible = ref(false);
const searchQuery = ref("");
const searchResults = ref([]);

const showDropdown = ref(false);

const hideDropdown = () => {
  setTimeout(() => {
    if (
      // !document.querySelector(".relative:hover") &&
      !document.querySelector(".absolute:hover")
    ) {
      showDropdown.value = false;
      newsItems.value = [];
    }
  }, 10);
};
const toggleCardDropdown = () => {
  isCardDropdownOpen.value = !isCardDropdownOpen.value;
};
const formatPublishTime = (publishTime) => {
  return moment(publishTime).fromNow();
};
// const scrollLeft = () => {
//   if (categoriesContainer.value) {
//     categoriesContainer.value.scrollBy({
//       left: -100,
//       behavior: "smooth",
//     });
//   }
// };

// const scrollRight = () => {
//   if (categoriesContainer.value) {
//     categoriesContainer.value.scrollBy({
//       left: 100,
//       behavior: "smooth",
//     });
//   }
// };

// const toggleMenu = () => {
//   isMenuOpen.value = !isMenuOpen.value;
// };

// const toggleDropdown = () => {
//   isDropdownOpen.value = !isDropdownOpen.value;
// };

const handleBackgroundClick = () => {
  hidePopup();
};

const handleAuthAction = async () => {
  if (isLoggedIn.value) {
    showPopup();
  } else {
    router.push("/Login");
  }
};

const showPopup = () => {
  isPopupVisible.value = true;
};

const hidePopup = () => {
  isPopupVisible.value = false;
};

const navigateToNewsDetail = (id) => {
  router.push(`/news/${id}`);
  console.log("Navigating to news detail with ID:", id);
};

const handleLogout = async () => {
  if (isLoggingOut.value) return;
  isLoggingOut.value = true;

  try {
    const auth = getAuth();
    await signOut(auth);

    const apiDataToken = localStorage.getItem("apiDataToken");
    if (apiDataToken) {
      const response = await apiService.apiCall(
        "post",
        `${apiConfig.LOGOUT_EVENT}`
      );
      // const response = await axios.post(
      //   "https://api-uat.newsshield.io/user/logoutEvent",
      //   {},
      //   {
      //     headers: { Authorization: `${apiDataToken}` },
      //   }
      // );
      if (response.status === 200) {
        console.log(`BEFORE ${localStorage.getItem("news-")}`);
        localStorage.removeItem("apiDataToken");
        localStorage.setItem("logoutSuccess", "true");
        isLoggedIn.value = false;
        router.push("/");
        toast.add({
          severity: "success",
          summary: "Logged out successfully!",
          summary2: "You have been safely logged out.",
          group: "success",
          life: 3000,
        });
        isCardDropdownOpen.value = !isCardDropdownOpen.value;
      } else {
        throw new Error("Failed to logout, unexpected response status");
      }
    }
  } catch (error) {
    console.error("Error during logout:", error);
    toast.add({
      severity: "error",
      summary: "Logged out Failed!",
      summary2: "Try again after sometime.",
      group: "error",
      life: 3000,
    });
  } finally {
    isLoggingOut.value = false;
    hidePopup();
    toggleCardDropdown();
  }
};
const fetchNavbarCategory = async () => {
  const payload = {
    categoryId,
  };
  try {
    const res = await apiService.apiCall(
      "post",
      `${apiConfig.GET_CATEGORY_WISE_NEWS_FOR_WEB}`,
      payload
    );
    // const res = await axios.post(
    //   "https://api-uat.newsshield.io/news/getCategoryWiseNewsForWeb/",
    //   { categoryId }
    // );
    categoryWise.value = res.data;
  } catch (error) {
    return [];
  }
};
const fetchCategories = async () => {
  const languageId = "6421a32aa020a23deacecf92";
  const payload = {
    langauge: languageId,
  };
  try {
    // const response = await axios.post(
    //   "https://api-uat.newsshield.io/category/getAllCat",
    //   {}
    // );
    const response = await apiService.apiCall(
      "post",
      `${apiConfig.GET_ALL_CATEGORY}`,
      payload
    );
    categories.value = response.data.map((category) => ({
      ...category,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

// const toggleSearchInput = () => {
//   isInputVisible.value = !isInputVisible.value;
// };

const handleSearch = async () => {
  if (
    searchQuery.value.trim().length >= 4 &&
    searchQuery.value.trim().length % 4 === 0
  ) {
    try {
      const payload = {
        language: "6421a32aa020a23deacecf92",
        search: searchQuery.value,
      };
      const response = await apiService.apiCall(
        "post",
        `${apiConfig.SEARCH_NEWS_FROM_WEB}`,
        payload
      );
      // const response = await axios.post(
      //   "https://api-uat.newsshield.io/news/searchNewsFromWeb"
      // );
      searchResults.value = response.data;
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      loading.value = false;
    }
  } else if (searchQuery.value.trim().length < 4) {
    searchResults.value = [];
  }
};

// const expandInput = () => {
//   isExpanded.value = true;
// };

const collapseInput = (event) => {
  if (
    searchResultsDropdown.value &&
    !searchResultsDropdown.value.contains(event.target) &&
    searchInput.value &&
    !searchInput.value.contains(event.target)
  ) {
    isExpanded.value = false;
    searchResults.value = [];
    searchQuery.value = "";
  }
};

onMounted(() => {
  fetchCategories();
  document.addEventListener("mousedown", collapseInput);
  fetchNavbarCategory();
  // const categoryId = "63d90e4098d783ac0cbe2310";
  // const storedNews = localStorage.getItem(`news-${categoryId}`);

  // if (storedNews) {
  //   newsItems.value = JSON.parse(storedNews);
  //   console.log("Fetched news items:", newsItems.value);
  // } else {
  //   console.log(
  //     "No news found in local storage for category:",
  //     "news-" + categoryId
  //   );
  // }
});
const navigateToTrending = (id) => {
  console.log("Navigating to trending with ID:", id);
  if (id) {
    router.push(`/news/${id}`);
  }
};
const fetchCategoryFromLocalStorage = (categoryId) => {
  const storedNews = localStorage.getItem(`news-${categoryId}`);
  console.log(`FUNCTION CALLED news-${categoryId} news-${storedNews}`);
  if (storedNews) {
    console.log("INSIDE IF");
    newsItems.value = JSON.parse(storedNews);
    console.log("Fetched news items:", newsItems.value); // Verify the fetched items
  } else {
    console.log("INSIDE ELSE");

    // console.log(
    //   "No news found in local storage for category:",
    //   `news-${categoryId}`
    // );
  }
};

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", collapseInput);
});

const inputClass = computed(() =>
  isExpanded.value
    ? "w-[441px] py-2 transition-all duration-300"
    : "w-[220px] py-2 transition-all duration-300"
);

watch(searchQuery, (newValue) => {
  if (newValue.trim().length >= 4 && newValue.trim().length % 4 === 0) {
    handleSearch();
  } else if (newValue.trim().length < 4) {
    searchResults.value = [];
  }
});
</script>

<style scoped>
.nav-items.active-link {
  color: #ff0053; /* Color for active navigation item */
}

.nav-items:active {
  color: #ff0053; /* Color for active state */
}
.card-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 10;
}
.chip-button {
  background-color: #fff;
  border: 1px solid #d4d4d4;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  color: #676767;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s, color 0.3s;
  text-transform: capitalize;
}
.head-cat::-webkit-scrollbar {
  display: none !important;
}
.two_line {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2 !important; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
.shadow-custom {
  box-shadow: 0px 0px 3.41px 0.71px #0000000d;
}
.border-custom {
  border: 0.4px solid #e2e2e2ce;
}
.slim-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.slim-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.slim-scrollbar::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
}
.slim-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.multi-line-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
.multiline-truncate-one-liner {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
.multiline-truncate-tow-tow-liner {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* Number of lines to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
