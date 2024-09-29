<template>
  <div>
    <div
      class="w-[100%] h-[67px] bg-white rounded-b-[20px] shadow-[0px_4px_6px_rgba(240,0,0,0.2)] justify-between flex items-center pl-4 pr-4"
    >
      <div class="">
        <a href="/">
          <img
            class="h-[20px] w-[78px] object-cover"
            src="https://uploads-ssl.webflow.com/64ae7a0260c324b7e56ab6b5/64b653319dad7b8061b00de2_sachai-logo.webp"
          />
        </a>
      </div>
      <div class="w-[60%]">
        <div class="flex gap-3 items-center justify-end">
          <div class="hidden lg:flex head-navs gap-2">
            <!-- <a href="/">Home</a> -->
            <img v-if="isHomeActive" src="../assets/active_home.svg" />
            <img v-else src="../assets/Home.svg" />
            <RouterLink class="nav-items" active-class="active-link" to="/"
              >Home</RouterLink
            >
          </div>
          <div class="hidden lg:flex head-navs gap-2" v-if="isLoggedIn">
            <img
              v-if="isAstrologyActive"
              src="../assets/active_astrology.svg"
              alt=""
            />
            <img v-else src="../assets/Astrology.svg" alt="" />

            <RouterLink
              class="nav-items"
              active-class="active-link"
              to="/Astrology"
              >Astrology</RouterLink
            >
            <!-- Astrology -->
          </div>

          <div class="hidden lg:flex head-navs gap-2">
            <img
              v-if="isBookmarkActive"
              src="../assets/active_bookmark.svg"
              alt=""
            />
            <img v-else src="../assets/Bookmark.svg" alt="" />
            <RouterLink
              class="nav-items"
              active-class="active-link"
              to="/Bookmark"
              >Bookmark</RouterLink
            >
          </div>
          <div class="hidden lg:flex head-navs gap-2">
            <img src="../assets/Login.svg" alt="" />
            <a href="#" class="nav-items" @click="handleAuthAction">
              {{ isLoggedIn ? "Logout" : "Login" }}
            </a>
          </div>
          <div class="w-[50%] relative hidden md:block">
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
              src="../assets/svg-icons/search.svg"
              class="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
            <div
              v-if="searchResults.length"
              ref="searchResultsDropdown"
              class="absolute w-full bg-white p-2 border border-gray-300 rounded-md mt-2 z-10 h-[370px] overflow-y-auto slim-scrollbar"
            >
              <div
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
          <router-link class="md:hidden sm-max:block">
            <div
              class="h-[34px] w-[34px] rounded-full flex justify-center items-center shadow-md"
            >
              <img src="../assets/search.svg" alt="" />
            </div>
          </router-link>
          <router-link v-if="isLoggedIn">
            <div
              class="h-[34px] w-[34px] rounded-full flex justify-center items-center shadow-md"
              @click="navigateToSettings"
            >
              <img
                v-if="isSettingsActive"
                src="../assets/active_setting.svg"
                alt=""
              />
              <img v-else src="../assets/Settings.svg" alt="" />
            </div>
          </router-link>
          <router-link v-if="isLoggedIn">
            <div
              class="h-[34px] w-[34px] rounded-full flex justify-center items-center shadow-md"
              @click="navigateToProfile"
            >
              <img
                v-if="isAccountsActive"
                src="../assets/active_account.svg"
                alt=""
              />
              <img v-else src="../assets/Account.svg" alt="" />
            </div>
          </router-link>

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
      class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
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
    <div
      class="w-full h-[67px] mt-1 flex justify-between bg-white items-center relative lg:overflow-x-hidden"
    >
      <!-- Icons for mobile and tablet screens -->
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
    </div>

    <!-- Popup Confirmation -->
    <div
      v-if="isPopupVisible"
      class="fixed inset-0 flex items-center justify-center pop-up-confirm bg-opacity-50 z-50"
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

<script>
import axios from "axios";
import { onBeforeUnmount, onMounted, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { getAuth, signOut } from "firebase/auth";
import { useToast } from "primevue/usetoast";
import { useRoute } from "vue-router";
export default {
  setup() {
    const isMenuOpen = ref(false);
    const isDropdownOpen = ref(false);
    const categories = ref([]);
    const isLoggedIn = ref(!!localStorage.getItem("apiDataToken"));
    const showBookmarkLink = ref(true);
    const isPopupVisible = ref(false);
    const isExpanded = ref(false);
    const searchInput = ref(null);
    const searchResultsDropdown = ref(null);
    const router = useRouter();
    const toast = useToast();
    const categoriesContainer = ref(null);
    const isLoggingOut = ref(false);
    const isCardDropdownOpen = ref(false);
    const route = useRoute();
    const isInputVisible = ref(false);
    const searchQuery = ref("");
    const searchResults = ref([]);

    const isHomeActive = computed(() => route.path === "/");
    const isAstrologyActive = computed(() => route.path === "/Astrology");
    const isBookmarkActive = computed(() => route.path === "/Bookmark");
    const isSettingsActive = computed(() => route.path === "/Setting");
    const isAccountsActive = computed(() => route.path === "/Profile");

    const toggleCardDropdown = () => {
      isCardDropdownOpen.value = !isCardDropdownOpen.value;
    };
    const navigateToSettings = () => {
      router.push("/Setting");
    };
    const navigateToProfile = () => {
      router.push("/Profile");
    };
    const scrollLeft = () => {
      if (categoriesContainer.value) {
        categoriesContainer.value.scrollBy({
          left: -100,
          behavior: "smooth",
        });
      }
    };

    const scrollRight = () => {
      if (categoriesContainer.value) {
        categoriesContainer.value.scrollBy({
          left: 100,
          behavior: "smooth",
        });
      }
    };

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    const handleBackgroundClick = () => {
      hidePopup();
    };

    const handleAuthAction = async () => {
      if (isLoggedIn.value) {
        showPopup();
      } else {
        try {
          await router.push("/Login");
        } catch (error) {
          console.error("Navigation error:", error);
        }
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
          const response = await axios.post(
            "https://api-uat.newsshield.io/user/logoutEvent",
            {},
            {
              headers: { Authorization: `${apiDataToken}` },
            }
          );

          if (response.status === 200) {
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

    const fetchCategories = async () => {
      try {
        const languageId = "6421a32aa020a23deacecf92";
        const response = await axios.post(
          "https://api-uat.newsshield.io/category/getAllCat",
          { langauge: languageId }
        );
        categories.value = response.data.map((category) => ({
          ...category,
          name:
            category.name.toLowerCase() === "ai"
              ? category.name.toUpperCase()
              : category.name.replace(/-/g, " "),
        }));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const toggleSearchInput = () => {
      isInputVisible.value = !isInputVisible.value;
    };

    const handleSearch = async () => {
      if (
        searchQuery.value.trim().length >= 4 &&
        searchQuery.value.trim().length % 4 === 0
      ) {
        try {
          const response = await axios.post(
            "https://api-uat.newsshield.io/news/searchNewsFromWeb",
            {
              language: "6421a32aa020a23deacecf92",
              search: searchQuery.value,
            }
          );
          searchResults.value = response.data;
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      } else if (searchQuery.value.trim().length < 4) {
        searchResults.value = [];
      }
    };

    const expandInput = () => {
      isExpanded.value = true;
    };

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
    });

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

    return {
      navigateToSettings,
      isExpanded,
      searchInput,
      expandInput,
      inputClass,
      isMenuOpen,
      isDropdownOpen,
      categories,
      isLoggedIn,
      showBookmarkLink,
      isPopupVisible,
      toggleMenu,
      toggleDropdown,
      handleAuthAction,
      handleBackgroundClick,
      hidePopup,
      handleLogout,
      scrollRight,
      scrollLeft,
      categoriesContainer,
      isCardDropdownOpen,
      toggleCardDropdown,
      isInputVisible,
      searchQuery,
      toggleSearchInput,
      handleSearch,
      searchResults,
      navigateToNewsDetail,
      searchResultsDropdown,
      isHomeActive,
      isAstrologyActive,
      isBookmarkActive,
      isSettingsActive,
      isAccountsActive,
      navigateToProfile,
    };
  },
};
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
</style>
